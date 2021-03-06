import React, { Component } from 'react';
import M from 'materialize-css';
//import { Autocomplete } from "react-materialize";
import CollapseBody from './local-components/CollapseBody';
import NewItemBtn from './local-components/NewItemBtn';
import axios from 'axios';

class AdminInventory extends Component {
    constructor(props) {
        super(props);

        // Bind the this context to the handler function
        this.updateOnNewItem = this.updateOnNewItem.bind(this);

        // Set some state
        this.state = {
            sortedItems: {},
            activeCategory: ''
        };
    }

    componentDidMount() {
        this.getItems();

        M.AutoInit();
    }
    componentDidUpdate() {
        M.AutoInit();
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {
            closeOnClick: false,
            constrainWidth: false
        });
    }
    // this function will be sent to NewItemBtn so it can call and update this component on successful item add
    updateOnNewItem() {
        this.getItems();
    }
    // this function will be sent to CollapseBody and then to Card so it can call and update this component on successful item edit
    updateOnItemChange(category) {
        console.log(category);
        this.setState({ activeCategory: category });
        this.getItems();
        M.AutoInit();
    }
    getItems() {
        axios
            .get('/api/items', {
                headers: {
                    'x-session-token': this.props.sessionToken
                }
            })
            .then(response => {
                console.log(response);
                this.sortItems(response.data);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sortItems(items) {
        let obj = {};
        let tags = {};

        for (let i in items) {
            if (obj[items[i].category]) {
                obj[items[i].category].push(items[i]);
            } else {
                obj[items[i].category] = [items[i]];
            }
            //add to tags if item has tags and tag hasn't been added yet
            if (items[i].tags.length > 0) {
                for (let j in items[i].tags) {
                    if (!tags[items[i].tags[j]]) {
                        tags[items[i].tags[j]] = null;
                    }
                }
            }
        }
        this.setState({ sortedItems: obj, tagList: tags });
    }
    getHeaderIcon(cat) {
        return cat === 'Laptop - Mac'
            ? 'laptop_mac'
            : cat === 'Laptop - PC'
                ? 'laptop_windows'
                : cat === 'iPad'
                    ? 'tablet_mac'
                    : cat === 'keyboard'
                        ? 'keyboard'
                        : cat === 'mouse'
                            ? 'mouse'
                            : cat === 'Deleted'
                                ? 'delete_forever'
                                : 'help'
    }

    render() {
        return (
            <div>
                <NewItemBtn
                    sessionToken={this.props.sessionToken}
                    tags={this.state.tagList}
                    {...this.state}
                    updateOnNewItem={this.updateOnNewItem}
                />
                <ul className="collapsible">
                    {Object.keys(this.state.sortedItems).map(
                        (keyName, keyIndex) => (
                            <li
                                key={keyIndex + '-li'}
                                className={
                                    keyName === this.state.activeCategory
                                        ? 'active'
                                        : ''
                                }
                            >
                                <div className="collapsible-header">
                                    <i className="material-icons">{this.getHeaderIcon(keyName)}</i>
                                    {keyName}
                                </div>
                                <CollapseBody
                                    sessionToken={this.props.sessionToken}
                                    category={keyName}
                                    key={keyIndex}
                                    items={this.state.sortedItems[keyName]}
                                    updateOnItemChange={category =>
                                        this.updateOnItemChange(category)
                                    }
                                />
                            </li>
                        )
                    )}
                </ul>
            </div>
        );
    }
}

export default AdminInventory;

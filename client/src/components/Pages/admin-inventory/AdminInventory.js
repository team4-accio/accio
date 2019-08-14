import React, { Component } from "react";
import M from "materialize-css";
import { Autocomplete } from "react-materialize";
import CollapseBody from "./local-components/CollapseBody";
import NewItemBtn from "./local-components/NewItemBtn";
import axios from "axios";
import testArr from "./testArr.json"

class AdminInventory extends Component {
    constructor(props) {
        super(props)

        // Bind the this context to the handler function
        this.updateOnNewItem = this.updateOnNewItem.bind(this);

        // Set some state
        this.state = {
            sortedItems: {}
        }
    }


    componentDidMount() {
        this.getItems()

        M.AutoInit();
    }
    // this function will be sent to NewItemBtn so it can call and update this component on successful item add
    updateOnNewItem() {
        this.getItems();
    }
    getItems() {
        axios.get('/api/items')
            .then((response) => {
                console.log(response);
                this.sortItems(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sortItems(items) {
        let obj = {}
        let tags = {}

        for (let i in items) {
            if (obj[items[i].category]) {
                obj[items[i].category].push(items[i])
            }
            else {
                obj[items[i].category] = [items[i]]
            }
            //add to tags if item has tags and tag hasn't been added yet 
            if (items[i].tags.length > 0) {
                for (let j in items[i].tags) {
                    if (!tags[items[i].tags[j]]) {
                        tags[items[i].tags[j]] = null
                    }
                }
            }
        }
        this.setState({ sortedItems: obj, tagList: tags })
    }


    render() {
        return (
            <div>
                <NewItemBtn tags={this.state.tagList} {...this.state} updateOnNewItem={this.updateOnNewItem} />
                <ul className="collapsible">

                    {Object.keys(this.state.sortedItems).map((keyName, keyIndex) => (
                        <li key={keyIndex + '-li'}>
                            <div className="collapsible-header"><i className="material-icons">create</i>{keyName}</div>
                            <CollapseBody category={keyName} key={keyIndex} items={this.state.sortedItems[keyName]} >
                            </CollapseBody>
                        </li>
                    ))}

                </ul>

            </div>
        );
    }
}

export default AdminInventory;

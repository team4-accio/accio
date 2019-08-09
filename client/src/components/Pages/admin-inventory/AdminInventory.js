import React, { Component } from "react";
import M from "materialize-css";
import {Autocomplete} from "react-materialize";
import CollapseBody from "./local-components/CollapseBody";
import NewItemBtn from "./local-components/NewItemBtn";
import axios from "axios";
import testArr from "./testArr.json"

class AdminInventory extends Component {
    state = {
        sortedItems: {}
    }
    
    // constructor (props){
    //     super(props);
      
    //     this.state = {
    //         sortedItems: {}
    //       };
      
    //     this.sortItems = this.sortItems.bind(this);
      
    //   }

    componentDidMount() {
        this.getItems()
        //this.sortItems(testArr)
        M.AutoInit();
    }

    getItems(){
        axios.get('/api/items')
        .then( (response) => {
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
            if(items[i].tags.length >0){
                for(let j in items[i].tags){
                    if (!tags[items[i].tags[j]]) {
                        tags[items[i].tags[j]] = null
                    }
                }
            }
        }
        console.log(tags)
        this.setState({ sortedItems: obj, tagList: tags })
    }

    render() {
        return (
            <div>
                <NewItemBtn tags={this.state.tagList} />
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


// {Object.keys(this.state.sortedItems).map(function (keyName, keyIndex) {
//     // use keyName to get current key's name
//     // and a[keyName] to get its value
//     return (<li key={keyIndex + '-li'}>
//         <div className="collapsible-header"><i className="material-icons">create</i>{keyName}</div>
//         <CollapseBody category={keyName} key={keyIndex} {...this.state.sortItems[keyName]} >
//         </CollapseBody>
//     </li>)
// })
// }
// {
//     this.state.categories.map((value) => (
//         <li key={value + '-li'}>
//             <div className="collapsible-header"><i className="material-icons">create</i>{value}</div>
//             <CollapseBody category={value} key={value} {...this.state.sortedItems[keyName]} >
//             </CollapseBody>
//         </li>
//     ))
// }
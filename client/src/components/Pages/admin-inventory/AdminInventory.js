import React, { Component } from "react";
import M from "materialize-css";
import {Autocomplete} from "react-materialize";
import CollapseBody from "./local-components/CollapseBody";
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
        for (let i in items) {
            if (obj[items[i].category]) {
                obj[items[i].category].push(items[i])
            }
            else {
                obj[items[i].category] = [items[i]]
            }
        }
        //console.log(obj)
        this.setState({ sortedItems: obj })
    }

    render() {
        return (
            <div>

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
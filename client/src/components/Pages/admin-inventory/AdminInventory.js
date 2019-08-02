import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";

const testArr = [
    {
        category: 'Laptop - PC',
        serialNumber: '11111',
        condition: 'Good',
        available: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'Laptop - PC',
        serialNumber: '22222',
        condition: 'Okay',
        available: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'Laptop - PC',
        serialNumber: '33333',
        condition: 'Bad',
        available: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'Laptop - Mac',
        serialNumber: '44444',
        condition: 'Good',
        available: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'Laptop - Mac',
        serialNumber: '55555',
        condition: 'Okay',
        available: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'Laptop - Mac',
        serialNumber: '66666',
        condition: 'Bad',
        available: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'iPad',
        serialNumber: '77777',
        condition: 'Good',
        available: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'iPad',
        serialNumber: '88888',
        condition: 'Okay',
        available: true,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    },
    {
        category: 'iPad',
        serialNumber: '99999',
        condition: 'Bad',
        available: false,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        tags: []
    }
]
class AdminInventory extends Component {
    state = {
        sortedItems: {}
    }

    componentDidMount() {
        this.sortItems(testArr)
        M.AutoInit();
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
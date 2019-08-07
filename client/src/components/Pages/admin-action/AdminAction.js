import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";

let testArr = [
    {
        items: [{
            category: 'Laptop - PC',
            serialNumber: '11111',
            condition: 'Good',
            available: true,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            tags: []
        }],
        out: "07-20-2019",
        return: "08-10-2019", //NOT PAST DUE
        status: 'approved',
        user: "user.1@email.com"
    },
    {
        items: [{
            category: 'Laptop - Mac',
            serialNumber: '123456',
            condition: 'Good',
            available: true,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            tags: []
        }],
        out: "07-20-2019",
        return: "08-10-2019", //NOT PAST DUE
        status: 'approved',
        user: "user.11@email.com"
    },
    {
        items: [{
            category: 'Laptop - PC',
            serialNumber: '11111',
            condition: 'Good',
            available: true,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            tags: []
        }],
        out: "07-20-2019",
        return: "07-29-2019", //Past Due
        status: 'approved',
        user: "user.2@email.com"
    },
    {
        items: [{
            category: 'Laptop - PC',
            serialNumber: '22222',
            condition: 'Okay',
            available: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            tags: []
        }],
        out: "07-20-2019",
        return: "08-10-2019",
        status: 'closed',
        user: "user.3@email.com"
    },
    {
        items: [{
            category: 'Laptop - Mac',
            serialNumber: '66666',
            condition: 'Bad',
            available: false,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            tags: []
        }],
        out: "07-20-2019",
        return: "08-10-2019",
        status: 'pending',
        user: "user.4@email.com"
    },
    {
        items: [{
            category: 'iPad',
            serialNumber: '88888',
            condition: 'Okay',
            available: true,
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            tags: []
        }],
        out: "07-20-2019",
        return: "08-10-2019",
        status: 'rejected',
        user: "user.5@email.com"
    }
]

class AdminAction extends Component {
    state = {
        sortedActions: {}
    }

    componentDidMount() {
        this.sortActions(testArr)
        M.AutoInit();
    }

    sortActions(actions) {
 
        let pending = actions.filter(obj => {
            return obj.status === 'pending'
        })

        let approved = actions.filter(obj => {
            return obj.status === 'approved'
        })

        let overdue = [];
        let out = [];
        let today = new Date();
        for (let i in approved){
            var returnDate = new Date(approved[i].return );
            // if date is not overdue add to out
            if (returnDate < today ){
                overdue.push(approved[i])
            }
            // if date is  overdue add to overdue
            else {
                out.push(approved[i])
            }
        }

        let obj = {
            "Pending": pending,
            "Out": out,
            "Overdue": overdue
        }
        console.log(obj)
        this.setState({ sortedActions: obj })
    }

    render() {
        return (
            <div>

                <ul className="collapsible">

                    {Object.keys(this.state.sortedActions).map((keyName, keyIndex) => (
                        <li key={keyIndex + '-li'}>
                            <div className="collapsible-header"><i className="material-icons">create</i>{keyName}</div>
                            <CollapseBody category={keyName} key={keyIndex} actions={this.state.sortedActions[keyName]} >
                            </CollapseBody>
                        </li>
                    ))}

                </ul>

            </div>
        );
    }
}

export default AdminAction;


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
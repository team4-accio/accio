import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";
import axios from "axios";


const keyStyle = {
    fontWeight: "bold",
    float: "left"
};

// const countStyle = {
//     fontWeight: "bold",
//     float: "right"
// };



// let testArr = [
//     {
//         items: [{
//             category: 'Laptop - PC',
//             serialNumber: '11111',
//             condition: 'Good',
//             available: true,
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             tags: []
//         }],
//         out: "07-20-2019",
//         return: "08-10-2019", //NOT PAST DUE
//         status: 'approved',
//         user: "user.1@email.com"
//     },
//     {
//         items: [{
//             category: 'Laptop - Mac',
//             serialNumber: '123456',
//             condition: 'Good',
//             available: true,
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             tags: []
//         }],
//         out: "07-20-2019",
//         return: "08-10-2019", //NOT PAST DUE
//         status: 'approved',
//         user: "user.11@email.com"
//     },
//     {
//         items: [{
//             category: 'Laptop - PC',
//             serialNumber: '11111',
//             condition: 'Good',
//             available: true,
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             tags: []
//         }],
//         out: "07-20-2019",
//         return: "07-29-2019", //Past Due
//         status: 'approved',
//         user: "user.2@email.com"
//     },
//     {
//         items: [{
//             category: 'Laptop - PC',
//             serialNumber: '22222',
//             condition: 'Okay',
//             available: false,
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             tags: []
//         }],
//         out: "07-20-2019",
//         return: "08-10-2019",
//         status: 'closed',
//         user: "user.3@email.com"
//     },
//     {
//         items: [{
//             category: 'Laptop - Mac',
//             serialNumber: '66666',
//             condition: 'Bad',
//             available: false,
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             tags: []
//         }],
//         out: "07-20-2019",
//         return: "08-10-2019",
//         status: 'pending',
//         user: "user.4@email.com"
//     },
//     {
//         items: [{
//             category: 'iPad',
//             serialNumber: '88888',
//             condition: 'Okay',
//             available: true,
//             description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//             tags: []
//         }],
//         out: "07-20-2019",
//         return: "08-10-2019",
//         status: 'rejected',
//         user: "user.5@email.com"
//     }
// ]

class AdminAction extends Component {
    state = {
        sortedActions: {}
    }

    componentDidMount() {
        this.getStatuses()
        // this.sortActions(testArr)
        M.AutoInit();
        console.log("Component Did Mount")
    }

    //getStatuses stuck in continous loop work in progress to fix pulling from server
    getStatuses() {
        axios.get('/api/users')
            .then((response) => {
                console.log(response);
                this.sortActions(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }


    sortActions(actions) {

        let pending = actions.filter(obj => {
            let hasPending = false;
            if (obj.checkouts.length > 0) {
                for(let i in obj.checkouts){
                    if(obj.checkouts[i].status === 'pending'){
                        hasPending = true;
                    }
                }
            } if(hasPending){
                console.log(obj)
                return obj;
            }
        })

        let approved = actions.filter(obj => {
            let hasApproved = false;
            if (obj.checkouts.length > 0) {
                for(let i in obj.checkouts){
                    if(obj.checkouts[i].status === 'approved'){
                        hasApproved = true;
                    }
                }
            } if(hasApproved){
                console.log(obj)
                return obj;
            }
        })

        console.log(actions)



        let overdue = [];
        let out = [];
        let today = new Date();
        for (let i in approved) {
            var returnDate = new Date(approved[i].return);
            // if date is not overdue add to out
            if (returnDate < today) {
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
        console.log("sort actions did invoke")

    }


    render() {
        return (
            <div>

                <ul className="collapsible">

                    {Object.keys(this.state.sortedActions).map((keyName, keyIndex) => (
                        <li key={keyIndex + '-li'}>
                            <div className="collapsible-header">
                                {keyName === "Pending" ?
                                    <div id="pendingCollapse">
                                        <div id="pendingButton" style={keyStyle}>
                                            <i class="large material-icons">thumbs_up_down</i> {keyName} || {this.state.sortedActions[keyName].length}
                                        </div>
                                        {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
                                        <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
                                    </div>
                                    : null
                                }
                                {keyName === "Out" ?
                                    <div id="outCollapse" style={keyStyle}>
                                        <i class="large material-icons">all_out</i> {keyName} || {this.state.sortedActions[keyName].length}
                                        {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
                                        <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
                                    </div>
                                    : null
                                }
                                {keyName === "Overdue" ?
                                    <div id="overdueCollapse" style={keyStyle}>
                                        <i class="large material-icons" >warning</i> {keyName} || {this.state.sortedActions[keyName].length}
                                        {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
                                        <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
                                    </div>
                                    : null
                                }
                                {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
                                        <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
                            </div>
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

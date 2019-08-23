// import React, { Component } from "react";
// import M from "materialize-css";
// import CollapseBody from "./local-components/CollapseBody";
// import axios from "axios";
// import moment from "moment";



// const keyStyle = {
//     fontWeight: "bold",
//     float: "left"
// };


// class AdminAction extends Component {
//     state = {
//         sortedActions: {}
//     }

//     componentDidMount() {
//         this.getStatuses()
//         // this.sortActions(testArr)
//         M.AutoInit();
//         console.log("Component Did Mount")
//     }

//     //getStatuses stuck in continous loop work in progress to fix pulling from server
//     getStatuses() {
//         axios.get('/api/users')
//             .then((response) => {
//                 console.log(response);
//                 this.sortActions(response.data)
//             })
//             .catch(function (error) {
//                 console.log(error);
//             });
//     }
//     //Onclick buttons functions below to link with grandchild FE
//     approveButton = checkoutID =>{
//         console.log("Approved button has been invoked")
//         axios.patch("/api/checkouts/" + checkoutID, { status: "approved" })
//         .then(function (res) {console.log(res.data)});
//         this.getStatuses();
//     }
//     rejectButton = checkoutID =>{
//         console.log("Reject button has been invoked")
//         axios.patch("/api/checkouts/" + checkoutID, { status: "rejected" })
//         .then(function (res) {console.log(res.data)});
//         this.getStatuses()
//     }
//     checkinButton = checkoutID =>{
//         console.log("Checkin button has been invoked")
//         axios.patch("/api/checkouts/" + checkoutID, { status: "closed" })
//         .then(function (res) {console.log(res.data)});
//         this.getStatuses()
//     }


//     sortActions(actions) {

//         //NEED TO DO
//         // Change API to call Checkouts and filter checkouts
//         // Then create an API call for users to match the user ID in checkouts with the user ID in users api
//         // Consolidate and get it to work
//         let pending = actions.filter(obj => {
//             let hasPending = false;
//             if (obj.checkouts.length > 0) {
//                 for(let i in obj.checkouts){
//                     if(obj.checkouts[i].status === 'pending'){
//                         hasPending = true;
//                     }
//                 }
//             } if(hasPending){
//                 console.log(obj)
//                 return obj;
//             }
//         })

//         let approved = actions.filter(obj => {
//             let hasApproved = false;
//             if (obj.checkouts.length > 0) {
//                 for(let i in obj.checkouts){
//                     if(obj.checkouts[i].status === 'approved'){
//                         hasApproved = true;
//                     }
//                 }
//             } if(hasApproved){
//                 console.log(obj)
//                 return obj;
//             }
//         })

//         console.log(actions)



//         let overdue = [];
//         let out = [];
//         let today = moment();
//         for (let i in approved) {
//             var returnDate = moment(approved[i].checkouts[0].return);
//             // if date is not overdue add to out
//             if (returnDate.isBefore(today, "day")) {
//                 overdue.push(approved[i])
//             }
//             // if date is  overdue add to overdue
//             else {
//                 out.push(approved[i])
//             }
//         }

//         let obj = {
//             "Pending": pending,
//             "Out": out,
//             "Overdue": overdue
//         }


//         console.log(obj)
//         this.setState({ sortedActions: obj })
//         console.log("sort actions did invoke")

//     }


//     render() {
//         return (
//             <div>

//                 <ul className="collapsible">

//                     {Object.keys(this.state.sortedActions).map((keyName, keyIndex) => (
//                         <li key={keyIndex + '-li'}>
//                             <div className="collapsible-header">
//                                 {keyName === "Pending" ?
//                                     <div id="pendingCollapse">
//                                         <div id="pendingButton" style={keyStyle}>
//                                             <i className="large material-icons">thumbs_up_down</i> {keyName} || {this.state.sortedActions[keyName].length}
//                                         </div>
//                                         {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
//                                         <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
//                                     </div>
//                                     : null
//                                 }
//                                 {keyName === "Out" ?
//                                     <div id="outCollapse" style={keyStyle}>
//                                         <i className="large material-icons">all_out</i> {keyName} || {this.state.sortedActions[keyName].length}
//                                         {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
//                                         <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
//                                     </div>
//                                     : null
//                                 }
//                                 {keyName === "Overdue" ?
//                                     <div id="overdueCollapse" style={keyStyle}>
//                                         <i className="large material-icons" >warning</i> {keyName} || {this.state.sortedActions[keyName].length}
//                                         {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
//                                         <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
//                                     </div>
//                                     : null
//                                 }
//                                 {/* <div className="titleOfKey" style={keyStyle}>{keyName} | </div>
//                                         <div className="countOfKey" style={countStyle}>| {this.state.sortedActions[keyName].length}</div> */}
//                             </div>
//                             <CollapseBody 
//                             category={keyName} 
//                             key={keyIndex} 
//                             actions={this.state.sortedActions[keyName]} 
//                             approveButton={(checkoutID) => this.approveButton(checkoutID)}
//                             rejectButton={(checkoutID) => this.rejectButton(checkoutID)}
//                             checkinButton={(checkoutID) => this.checkinButton(checkoutID)}
//                             >
//                             </CollapseBody>
//                         </li>
//                     ))}

//                 </ul>

//             </div>
//         );
//     }
// }

// export default AdminAction;

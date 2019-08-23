import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";
import axios from "axios";
import moment from "moment";
import * as emailjs from 'emailjs-com';

const keyStyle = {
    fontWeight: "bold",
    float: "left"
};

class AdminAction extends Component {
    state = {
        sortedActions: {}
    }

    componentDidMount() {
        this.getCheckouts();
        this.getUsername();
        M.AutoInit();
        console.log("Component Did Mount")
    }

    // Approve button section tieing with emailjs, needed to convert checkoutID --> userID --> email to send to approveEmail function //
    approveButton = checkoutID => {
        console.log("Approved button has been invoked")
        axios.patch("/api/checkouts/" + checkoutID, { status: "approved" }, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then(function (res) { console.log(res.data) });
        this.getCheckouts();
        this.approveCheckoutIDtoUserID(checkoutID);
    }

    approveCheckoutIDtoUserID = checkoutID => {
        axios.get("/api/checkouts/" + checkoutID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        })
            .then((response) => {
                console.log(response.data.user);
                this.approveUserIDtoEmail(response.data.user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    approveUserIDtoEmail = userID => {
        console.log("userIDtoEmail function has been invoked");
        axios.get("/api/users/" + userID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                console.log(response.data.email);
                this.approveEmail(response.data.email);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    approveEmail = userEmail => {
        emailjs.init('user_nWBvESbGmUxkR9p2vkJS4');
        var templateParams = {
            name: "AccioAdmin",
            to_email: userEmail,
        };
        emailjs.send('default_service', 'accioaccept', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    // Reject button section tieing with emailjs, needed to convert checkoutID --> userID --> email to send to rejectEmail function //
    rejectButton = checkoutID => {
        console.log("Reject button has been invoked")
        axios.patch("/api/checkouts/" + checkoutID, { status: "rejected" }, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then(function (res) { console.log(res.data) });
        this.getCheckouts();
        this.rejectCheckoutIDtoUserID(checkoutID);
    }

    rejectCheckoutIDtoUserID = checkoutID => {
        axios.get("/api/checkouts/" + checkoutID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                console.log(response.data.user);
                this.rejectUserIDtoEmail(response.data.user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    rejectUserIDtoEmail = userID => {
        console.log("userIDtoEmail function has been invoked");
        axios.get("/api/users/" + userID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                console.log(response.data.email);
                this.rejectEmail(response.data.email);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    rejectEmail = userEmail => {
        emailjs.init('user_nWBvESbGmUxkR9p2vkJS4');
        var templateParams = {
            name: "AccioAdmin",
            to_email: userEmail,
        };
        emailjs.send('default_service', 'acciodeny', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    // Check-in button section tieing with emailjs, needed to convert checkoutID --> userID --> email to send to rejectEmail function //
    checkinButton = checkoutID => {
        console.log("Checkin button has been invoked")
        axios.patch("/api/checkouts/" + checkoutID, { status: "closed" }, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then(function (res) { console.log(res.data) });
        this.getCheckouts();
        this.checkinCheckoutIDtoUserID(checkoutID)
    }

    checkinCheckoutIDtoUserID = checkoutID => {
        axios.get("/api/checkouts/" + checkoutID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                this.checkinUserIDtoEmail(response.data.user);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkinUserIDtoEmail = userID => {
        console.log("userIDtoEmail function has been invoked");
        axios.get("/api/users/" + userID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                this.checkinEmail(response.data.email);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    checkinEmail = userEmail => {
        emailjs.init('user_nWBvESbGmUxkR9p2vkJS4');
        var templateParams = {
            name: "AccioAdmin",
            to_email: userEmail,
        };
        emailjs.send('default_service', 'acciocheckin', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }

    // Notify button logic below ////////////////////////////////////////////////////////////////////////////////////////////////////
    notifyButton = userNameID => {
        console.log("notifyButton function has been invoked")
        axios.get("/api/users/" + userNameID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                this.notifyEmail(response.data.email)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    notifyEmail = userEmail => {
        emailjs.init('user_nWBvESbGmUxkR9p2vkJS4');
        var templateParams = {
            name: "AccioAdmin",
            to_email: userEmail,
        };
        emailjs.send('default_service', 'template_ZNHve5tD', templateParams)
            .then(function (response) {
                console.log('SUCCESS!', response.status, response.text);
            }, function (error) {
                console.log('FAILED...', error);
            });
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    getCheckouts() {
        axios.get('/api/checkouts', {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                this.sortActions(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    getUsername = userNameID => {
        console.log("getUsername function has been invoked");
        console.log(userNameID)
        axios.get("/api/users/" + userNameID, {
            headers: {
                'x-session-token': this.props.sessionToken
            }
        }
        )
            .then((response) => {
                console.log(response.data.name);
                return (response.data.name);
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    sortActions(actions) {
        let pending = actions.filter(obj => {
            if (obj.status === "pending") {
                return obj;
            }
        })
        let approved = actions.filter(obj => {
            if (obj.status === "approved") {
                return obj;
            }
        })
        let overdue = [];
        let out = [];
        let today = moment();
        for (let i in approved) {
            var returnDate = moment(approved[i].return);
            // if date is not overdue add to out
            if (returnDate.isBefore(today, "day")) {
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
                                            <i className="large material-icons">thumbs_up_down</i> {keyName} || {this.state.sortedActions[keyName].length}
                                        </div>
                                    </div>
                                    : null
                                }
                                {keyName === "Out" ?
                                    <div id="outCollapse" style={keyStyle}>
                                        <i className="large material-icons">all_out</i> {keyName} || {this.state.sortedActions[keyName].length}
                                    </div>
                                    : null
                                }
                                {keyName === "Overdue" ?
                                    <div id="overdueCollapse" style={keyStyle}>
                                        <i className="large material-icons" >warning</i> {keyName} || {this.state.sortedActions[keyName].length}
                                    </div>
                                    : null
                                }
                            </div>
                            <CollapseBody
                                category={keyName}
                                key={keyIndex}
                                actions={this.state.sortedActions[keyName]}
                                getUsername={(userNameID) => this.getUsername(userNameID)}
                                notifyButton={(userNameID) => this.notifyButton(userNameID)}
                                approveButton={(checkoutID) => this.approveButton(checkoutID)}
                                rejectButton={(checkoutID) => this.rejectButton(checkoutID)}
                                checkinButton={(checkoutID) => this.checkinButton(checkoutID)}
                            >
                            </CollapseBody>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}

export default AdminAction;

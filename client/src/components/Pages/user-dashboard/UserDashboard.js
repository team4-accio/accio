import React, { Component } from "react";
//import M from "materialize-css";
import DashHistory from "./local-components/DashHistory";
import DashCheckout from "./local-components/DashCheckout";
import DashAccount from "./local-components/DashAccount";
import moment from "moment";

class UserDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortedCheckouts: {
                pending: [],
                overdue: [],
                out: [],
                history: []
            }
        }
    }
    componentDidMount() {
        console.log(this.props.sessionUser);
        this.sortCheckouts(this.props.sessionUser.checkouts);
    }

    // componentWillReceiveProps(nextProps) {
    //     // this.setState({ dashType: nextProps.type })
    // }

    sortCheckouts(checkouts) {
        let obj = {
            pending: [],
            overdue: [],
            out: [],
            history: []
        };
        let today = moment();
        for (let i in checkouts) {
            checkouts[i].status === "pending"
                ? obj.pending.push(checkouts[i])
                : checkouts[i].status === "approved"
                    ? moment(checkouts[i].return).isBefore(today, "day")
                        ? obj.overdue.push(checkouts[i])
                        : obj.out.push(checkouts[i])
                    : obj.history.push(checkouts[i])
        }
        console.log(obj)
        this.setState({ sortedCheckouts: obj })
    }

    render() {
        return (
            <div className="container" >
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Hello {this.props.sessionUser.name}! </h4></li>
                </ul>
                <div></div>
                <div className="row" >
                    <div className='col s4'>
                        <DashCheckout />
                        <DashAccount />
                    </div>
                    <div className='col s8'>
                        <DashHistory checkouts={this.state.sortedCheckouts} />
                    </div>
                </div>
                <a href="#" id="menu" className="waves-effect waves-light btn btn-floating " style={{ opacity: "0", position: "fixed", bottom: 0, right: 0 }}><i className="material-icons">whatshot</i></a>
                <div className="tap-target" data-target="menu">
                    <div className="tap-target-content">
                        <h5>Coming Soon!</h5>
                        <p>This functionality is not completed yet.</p>
                    </div>
                </div>
            </div>
        )
    }
}
export default UserDashboard;
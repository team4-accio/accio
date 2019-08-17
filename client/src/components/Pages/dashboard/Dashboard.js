import React, { Component } from "react";
//import M from "materialize-css";
//import CollapseBody from "./local-components/CollapseBody";
//import Autocomplete from "./local-components/Autocomplete";
// import axios from "axios";
// import API from "../../../utils/API"
// import testArr from "./testArr.json"
// import moment from "moment"



class Dashboard extends Component {
    constructor(props) {
        super(props)
        console.log(props)
        this.state = {
            dashType: props.type
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ dashType: nextProps.type })
    }




    renderAdminDash() {
        return (
            <div className="container">

                <div>I will be the {this.state.dashType} dash</div>

            </div>

        )
    }
    renderUserDash() {
        return (
            <div>I will be the {this.state.dashType} dash</div>
        )
    }

    render() {
        return (
            this.state.dashType === "admin"
                ? this.renderAdminDash()
                : this.renderUserDash()
        )
    }
}
export default Dashboard;
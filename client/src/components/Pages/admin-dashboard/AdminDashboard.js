import React, { Component } from "react";
import M from "materialize-css";
import DashActions from "./local-components/DashActions";
//import Autocomplete from "./local-components/Autocomplete";
// import axios from "axios";
// import API from "../../../utils/API"
// import testArr from "./testArr.json"
// import moment from "moment"



class AdminDashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }

    componentWillReceiveProps(nextProps) {
        // this.setState({ dashType: nextProps.type })
    }





    render() {
        return (
            <div className="container">
                <DashActions />
            </div>
        )
    }
}
export default AdminDashboard;
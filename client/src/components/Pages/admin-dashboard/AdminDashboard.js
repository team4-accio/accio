import React, { Component } from "react";
import M from "materialize-css";
import DashActions from "./local-components/DashActions";
import DashInventory from "./local-components/DashInventory";
import DashUsers from "./local-components/DashUsers";
import DashAnalytics from "./local-components/DashAnalytics";
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
            <div className="container" >
                <div className="row" >
                    <div className='col s4'>
                       
                        <DashActions />
                        <DashUsers />
                        <DashAnalytics />
                    </div>
                    <div className='col s8'>
                    <DashInventory />
                    </div>
                </div>


            </div>
        )
    }
}
export default AdminDashboard;
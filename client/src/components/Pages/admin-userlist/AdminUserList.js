import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";
//import Autocomplete from "./local-components/Autocomplete";
import axios from "axios";
import testArr from "./testArr.json"

class AdminUserList extends Component {
    state = {
        userList: [],
        adminList: [],
        searchFilter: "Name",
        searchData: {}
    }

    componentDidMount() {
        this.getUsers("all");
        //this.sortUsers(testArr)
        M.AutoInit();

    }
    getUsers(filter, query) {
        filter === "all"
            ? axios.get('/api/users')
                .then((response) => {
                    console.log(response);
                    this.sortUsers(response.data)
                })
                .catch(function (error) {
                    console.log(error);
                })
            : filter === "Name"
                ? console.log("Name: " + query)
                : filter === "Email"
                    ? console.log("Email: " + query)
                    : filter === "Status"
                        ? console.log("Status: " + query)
                        : filter === "Overdue"
                            ? console.log("Overdue: " + query)
                            : console.log("Not a valid filter")
    }
    sortUsers(arr) {
        // sorts data for autocomplete to use
        let data = {};
        for (let i in arr) {
            data[arr[i].name] = null // can set to img link if we add profile images   'https://placehold.it/250x250'
        }
        this.setState({ searchData: data })

        // sorts data for this page to use
        let users = [];
        let admins = [];

        for (let i in arr) {
            if (arr[i].role == "user") {
                users.push(arr[i])
            }
            else {
                admins.push(arr[i])
            }
        }
        this.setState({ userList: users, adminList: admins })

        this.createSearchData()
    }

    //creates obj of user names for autocomplete field to use
    createSearchData() {
        let userList = this.state.userList;
        let adminList = this.state.adminList;
        let list = userList.concat(adminList);
        let tempObj = {};

        for (let i in list) {
            tempObj[list[i].name] = null // can set to img link if we add profile images   'https://placehold.it/250x250'
        }
        let options = {
            data: tempObj
        };

        this.initAutoComplete(options);
    }
    initAutoComplete(options) {
        let autocomplete = document.querySelectorAll('.autocomplete');


        M.Autocomplete.init(autocomplete, options);
    }


    //change searchType on click
    changeSearchFilter(type) {
        type === "all"
            ? this.getUsers("all")
            : type === "Overdue"
            ? this.getUsers("Overdue")
            :this.setState({ searchFilter: type })
    }


    render() {
        return (
            <div>

               <div className="row">
                    <div className="col s4 right">
                        <div className="input-field col s12">
                            <a className='dropdown-trigger btn-flat prefix left' href='#' data-target='dropdown1'><i className="material-icons prefix left ">search</i><i className="material-icons prefix" style={{ fontSize: "20px", paddingTop: "10px" }}>expand_more</i></a>
    
    
                            <ul id='dropdown1' className='dropdown-content'>
                                <li><a href="#!" onClick={() => this.changeSearchFilter("Name")} className="waves-effect waves-teal btn-flat">Name</a></li>
                                <li><a href="#!" onClick={() => this.changeSearchFilter("Email")} className='waves-effect waves-teal btn-flat disabled'>Email</a></li>
                                <li className="divider" tabIndex="-1"></li>
                                <li><a href="#!" onClick={() => this.changeSearchFilter("Status")} className='waves-effect waves-teal btn-flat disabled'>Status</a></li>
                                <li><a href="#!" onClick={() => this.changeSearchFilter("Overdue")} className='waves-effect waves-teal btn-flat disabled'>Overdue</a></li>
                            </ul>
                            <input type="text" id="autocomplete-input" className="autocomplete" />
                            <label htmlFor="autocomplete-input">{this.state.searchFilter}</label>
    
                        </div>
    
    
                    </div>
                    </div>
                    <div className="col s4 ">
                        <a className="waves-effect waves-light btn-flat" onClick={() => this.changeSearchFilter("all")} >All</a>
                    </div>
              

                <div className="container">
                    <ul className="collapsible">
                        <li key="admins-li">
                            <div className="collapsible-header"><i className="material-icons">build</i>Admins</div>
                            <CollapseBody key="admins"
                                listType="admins" users={this.state.adminList} >
                            </CollapseBody>
                        </li>
                        <li key="users-li" className="active">
                            <div className="collapsible-header"><i className="material-icons">recent_actors</i>Users</div>
                            <CollapseBody key="users" listType="users" users={this.state.userList} >
                            </CollapseBody>
                        </li>
    
                    </ul>

                </div>
            </div>
        );
    }
}

export default AdminUserList;


import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";
//import Autocomplete from "./local-components/Autocomplete";
import axios from "axios";
import API from "../../../utils/API"
import testArr from "./testArr.json"
import moment from "moment"



class AdminUserList extends Component {
    state = {
        userList: [],
        adminList: [],
        showingAll: true,
        searchFilter: "Name",
        value: "",
        searchData: {}
    }

    componentDidMount() {
        this.getUsers("all");

        M.AutoInit();
    }

    //Gets users based on passed filter state
    getUsers(filter, query) {
        //console.log(filter, query)
        (filter === "all"
            ? API.getAllUsers()
            : ["Name", "Email", "Status"].includes(filter)
                ? API.getFilteredUsers(filter, query) //cant have body in get req w/ axios
                : filter === "Overdue"
                    ? this.getOverdueUsers()
                    : console.log("Not a valid filter")
        ).then((response) => {
            console.log(response);
            this.sortUsers(response.data)
        })
            .catch(function (error) {
                console.log(error);
            })
    }
    // sorts data from getUsers for autocomplete to use
    sortUsers(arr) {
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
    // Gets all users from DB, 
    getOverdueUsers() {
        let today = moment();
        let allUsers = API.getAllUsers()
        return allUsers.then((response) => {
            // console.log(allUsers)
            let overdueUsers = response.data.filter((val) => {
                return (
                    val.checkouts.length > 0
                        ? val.checkouts.filter((checkout) => {
                            let returnDate = moment(checkout.return)
                            return returnDate.isBefore(today)
                        })
                        : false
                )
            })
            console.log(overdueUsers)
            return { data: overdueUsers }
        })
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
            data: tempObj,
            onAutocomplete: (val) => {
                this.setState({ value: val })
                this.getUsers(this.state.searchFilter, val)
            }
        };

        this.initAutoComplete(options);
    }
    initAutoComplete(options) {
        let autocomplete = document.querySelectorAll('.autocomplete');


        M.Autocomplete.init(autocomplete, options);
    }


    //change searchType on click
    changeSearchFilter(type) {
        if (type === "all") {
            this.getUsers("all");
            this.setState({ showingAll: true });
        }
        else if (type === "Overdue") {
            this.getUsers("Overdue");
            this.setState({ showingAll: false });
        }
        else {
            this.setState({ searchFilter: type, showingAll: false })
        }
    }
    handleInputChange = event => {
        this.setState({ value: event.target.value });
    }
    handleFormSubmit = event => {
        event.preventDefault();


    }
    render() {
        return (
            <div>

                <div className="row">
                    <div className="col s6 right">
                        {
                            !this.state.showingAll
                                ? <div className="col s2 left">
                                    <a className="waves-effect waves-light btn-flat" onClick={() => this.changeSearchFilter("all")} >All</a>
                                </div>
                                : null
                        }

                        <form className="col s12" onSubmit={this.handleFormSubmit}>
                            <div className="input-field col s10">

                                <a className='dropdown-trigger prefix left' href='#' data-target='dropdown1'><i className="material-icons prefix left">search</i><i className="material-icons prefix" style={{ fontSize: "20px", paddingTop: "15px" }}>expand_more</i></a>


                                <ul id='dropdown1' className='dropdown-content'>
                                    <li><a href="#!" onClick={() => this.changeSearchFilter("Name")} className="waves-effect waves-teal btn-flat">Name</a></li>
                                    <li><a href="#!" onClick={() => this.changeSearchFilter("Email")} className='waves-effect waves-teal btn-flat disabled'>Email</a></li>
                                    <li className="divider" tabIndex="-1"></li>
                                    <li><a href="#!" onClick={() => this.changeSearchFilter("Status")} className='waves-effect waves-teal btn-flat disabled'>Status</a></li>
                                    <li><a href="#!" onClick={() => this.changeSearchFilter("Overdue")} className='waves-effect waves-teal btn-flat'>Overdue</a></li>
                                </ul>
                                <input type="text" id="autocomplete-input" className="autocomplete" value={this.state.value} onChange={this.handleInputChange} onClick={this.handleInputChange} />
                                <label htmlFor="autocomplete-input">Search By {this.state.searchFilter}</label>

                            </div>
                        </form>

                    </div>
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


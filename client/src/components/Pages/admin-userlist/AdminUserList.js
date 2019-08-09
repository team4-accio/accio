import React, { Component } from "react";
import M from "materialize-css";
import CollapseBody from "./local-components/CollapseBody";
import axios from "axios";
import testArr from "./testArr.json"


class AdminUserList extends Component {
    state = {
        userList: [],
        adminList: []
    }

    componentDidMount() {
        this.getUsers();
        //this.sortUsers(testArr)
        M.AutoInit();
    }
    getUsers(){
        axios.get('/api/users')
        .then( (response) => {
            console.log(response);
            this.sortUsers(response.data)
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    sortUsers(arr) {
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
    }

    render() {
        return (
            <div>

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
        );
    }
}

export default AdminUserList;


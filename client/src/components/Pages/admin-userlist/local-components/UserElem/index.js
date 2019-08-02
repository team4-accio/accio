import React, { Component } from "react";
import M from "materialize-css";
import "./style.css";
import StatusChanger from "../StatusChanger"

class UserElem extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            user: props.user,
            userType: props.userType
        }
    }

    componentDidMount() {
        M.AutoInit();
    }

    //TESTING FUNCTION
    updateUserState(field) {
       if  (field == "status") {
            let obj = this.state.user
            obj.status == "active" ? obj.status = "inactive" : obj.status = "active"
            this.setState({ user: obj })
        }
        else{
            let obj = this.state.user
            obj.role == "user" ? obj.role = "admin" : obj.role = "user"
            this.setState({ user: obj })
        }
    }
    render() {
        return (

            <li className="collection-item avatar">
                <span className="title">{this.state.user.name}</span>
                <div>
                    {this.state.user.email}
                    <br />
                    {this.state.user.status.charAt(0).toUpperCase() + this.state.user.status.slice(1) + " "}
                    <StatusChanger
                        field="status"
                        status={this.state.user.status}
                        editStatus={false}
                        userName={this.state.user.name}
                        parent={this}
                    />
                    <br />
                    {this.state.user.role.charAt(0).toUpperCase() + this.state.user.role.slice(1) + " "}
                    <StatusChanger
                        field="role"
                        status={this.state.user.role}
                        editStatus={false}
                        userName={this.state.user.name}
                        parent={this}
                    />
                    {this.state.userType == "users" ?
                        <span ><br /> <a onClick={() => this.props.parent.updateModalContent(this.state.user.name)} className="modal-trigger" href="#modal1">History</a></span>
                        : null
                    }
                </div>


            </li>

        );
    }

}

export default UserElem;


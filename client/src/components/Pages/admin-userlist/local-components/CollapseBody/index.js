import React, { Component } from "react";
import "./style.css";
import M from "materialize-css";
import UserElem from "../UserElem";
import HistoryElem from "../HistoryElem";

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            listType: "",
            users: props.users,
            modalContent: {
                userName: "",
                history: []
            }
        }
    }

    componentDidMount() {
        M.AutoInit();
    }

    componentWillReceiveProps(nextProps) {
        //console.log(nextProps)
        this.setState(
            {
                listType: nextProps.listType,
                users: nextProps.users
            }
        );
    }
    // fired when child's history onclick is triggered 
    updateModalContent(userName) {
        //console.log(userName)
        // Testing arr search
        let user = this.state.users.find(obj => {
            return obj.name === userName
        })

        let content = {
            userName: userName,
            history: user.checkouts
        }
        this.setState({ modalContent: content })
    }

    render() {
        return (
            <div className="collapsible-body">
                <ul className="collection">
                    {
                        this.state.users.map((user) => (
                            <UserElem
                                user={user}
                                userType = {this.state.listType}
                                parent={this}
                            />
                        ))
                    }
                </ul>
                {this.state.listType == "users" ?
                    <div id="modal1" className="modal bottom-sheet">
                        <div className="modal-content">
                            <h4>{this.state.modalContent.userName}'s History:</h4>
                            <ul className="collection">
                                {this.state.modalContent.history.map((item) => (
                                    <HistoryElem
                                        {...item}
                                    />
                                ))}
                            </ul>
                        </div>
                        
                    </div>
                    : null
                }
            </div>
        );
    }
}

export default CollapseBody;
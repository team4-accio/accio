import React, { Component } from "react";
import "./style.css";
import ListAction from "../ListAction";

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            type: props.category,
            actions: props.actions,
            approveButton: props.approveButton,
            rejectButton: props.rejectButton,
            checkinButton: props.checkinButton,
            getUsername: props.getUsername,
            notifyButton: props.notifyButton

        }
    }

    passUsername = id => {
        //console.log(this.props)
        this.props.getUsername(id);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                type: nextProps.category,
                actions: nextProps.actions,
                approveButton: nextProps.approveButton,
                rejectButton: nextProps.rejectButton,
                checkinButton: nextProps.checkinButton,
                getUsername: nextProps.getUsername,
                notifyButton: nextProps.notifyButton

            }
        )
    }

    render() {
        return (
            <div className="collapsible-body">
                <div className="row">
                    <ul className="collection">
                        {
                            this.state.actions.map((action) => (
                                <ListAction
                                    action={action}
                                    type={this.state.type}
                                    passUsername={(id) => this.passUsername(id)}
                                    notifyButton={(userNameID) => this.props.notifyButton(userNameID)}
                                    approveButton={(checkoutID) => this.props.approveButton(checkoutID)}
                                    rejectButton={(checkoutID) => this.props.rejectButton(checkoutID)}
                                    checkinButton={(checkoutID) => this.props.checkinButton(checkoutID)}
                                    sessionToken={this.props.sessionToken}
                                />
                            ))
                        }
                    </ul>
                </div>

            </div>
        );
    }
}

export default CollapseBody;
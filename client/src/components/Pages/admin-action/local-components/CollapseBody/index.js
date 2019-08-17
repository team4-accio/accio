import React, { Component } from "react";
import "./style.css";
import ListAction from "../ListAction";

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            type: props.category,
            actions: props.actions
        }
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
                            approveButton={(checkoutID) => this.props.approveButton(checkoutID)}
                            rejectButton={(checkoutID) => this.props.rejectButton(checkoutID)}
                            checkinButton={(checkoutID) => this.props.checkinButton(checkoutID)}
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
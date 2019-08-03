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



    // componentWillReceiveProps(nextProps) {
    //     console.log(nextProps)
    //     this.setState(
    //         {
    //             type: nextProps.category
    //         }
    //     );
    // }


    // Need to tie in information from adminaction below
    render() {
        return (
            <div className="collapsible-body">
                <div className="row">
                <ul className="collection">
                {
                    this.state.actions.map((action) => (
                        <ListAction 
                            action={action}
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
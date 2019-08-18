import React, { Component } from "react";
import "./style.css";
import Card from "../Card";

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            type: props.category,
            items: props.items
        }
    }



    componentWillReceiveProps(nextProps) {
        this.setState(
            {
                type: nextProps.category,
                items: nextProps.items
            }
        )
    }

    render() {
        return (
            <div className="collapsible-body">
                <div className="row">
                    {
                        this.state.items.map((item) => (
                            <Card
                                item={item}
                                updateOnItemChange={(category) => this.props.updateOnItemChange(category)}
                            />
                        ))
                    }
                </div>
            </div>
        );
    }
}

export default CollapseBody;
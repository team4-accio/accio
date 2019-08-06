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

    render() {
        return (
            <div className="collapsible-body">
                <span>
                    {this.state.filteredinventory.map((item, index) => {

                        return (
                            <div key={index}>

                                <Card category={item.category} condition={item.condition} />
                            </div>
                        )
                    })}
                </span>
            </div>
        )
    }
    //     render() {
    //         return (
    //             <div className="collapsible-body">
    //                 <div className="row">
    //                     {
    //                         this.state.items.map((item) => (
    //                             <Card
    //                                 item={item}
    //                             />
    //                         ))
    //                     }
    //                 </div>

    //             </div>
    //         );
    //     }
    // }


    componentWillReceiveProps(nextProps) {
        console.log(nextProps)
        this.setState(
            {
                type: nextProps.category
            }
        );
    }
}




export default CollapseBody;
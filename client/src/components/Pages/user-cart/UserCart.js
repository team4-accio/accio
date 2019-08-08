// import React, { Component } from "react";
import React from "react";
import M from "materialize-css";
// import Card from "./local-components/Card";
import CollapseBody from "./local-components/CollapseBody";
import axios from "axios";
// import testArr from "./testArr.json"


class Cart extends React.Component {

    render() {
        console.log("rendered")
        // console.log(this.props.inventory)
        return (
            <div className="App">

                <CollapseBody
                    inventory={this.props.inventory}
                    handleRequest={this.props.handleRequest}
                />


                {/* <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                    <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                    <button onClick={() => this.changeFilter('electronics')}>Electronics</button> */}


            </div>
        );
    }

}

export default Cart;
// import React, { Component } from "react";
import React from "react";
import M from "materialize-css";
// import Card from "./local-components/Card";
import CollapseBody from "./local-components/CollapseBody";
import axios from "axios";
// import testArr from "./testArr.json"

class User extends React.Component {

    state = {

        filteredInventory: [],
        inventory: [],
        cart: []
    }

    componentDidMount() {
        this.getItems()
        console.log("component mount")
        // this.changeFilter(inventory)
        M.AutoInit();
    };

    getItems() {
        console.log("get items")
        axios.get('/api/items')
            .then((response) => {
                console.log("axios");
                this.setState({
                    inventory: response.data
                })

                // const inventoryItem = response.data;
                // console.log(inventoryItem);
                // this.changeFilter();
                //this.sortItems(response.data)

            })
            .catch(function (error) {
                console.log(error);
            })
    };

    handleRequest = (id) => {
        console.log(id);
        // console.log(this.state.inventory);
        const chosenItemForRequest = this.state.inventory.filter(each => each._id === id)
        console.log(chosenItemForRequest)
        var cart = this.state.cart
        cart.push(chosenItemForRequest[0])
        this.setState({
            cart: cart
        })

    }

    render() {
        console.log("rendered")
        // console.log(this.props.inventory)
        return (
            <div className="App">

                <CollapseBody
                    inventory={this.state.inventory}
                    handleRequest={this.handleRequest}
                />


                {/* <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                    <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                    <button onClick={() => this.changeFilter('electronics')}>Electronics</button> */}


            </div>
        );
    }
}


export default User;
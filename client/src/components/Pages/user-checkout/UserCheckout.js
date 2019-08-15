// import React, { Component } from "react";
import React from "react";
import M from "materialize-css";
// import Card from "./local-components/Card";
import CollapseBody from "./local-components/CollapseBody";
import Cart from "./local-components/Modal";
import axios from "axios";
import "./style.css";

// import DatePicker from 'react-datepicker';
// import "react-datepicker/dist/react-datepicker.css";
// import testArr from "./testArr.json"

class User extends React.Component {

    state = {

        filteredInventory: [],
        inventory: [],
        cart: [],
        startDate: new Date(),
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

    handlePostSuccess(response) {
        console.log("handlepost")
        console.log(response)
    }


    // displayCart() {
    // console.log
    // }

    render() {
        console.log("rendered")
        // console.log(this.props.inventory)
        return (
            <div className="App">
                <div className="CollapseHolder">

                    <CollapseBody
                        inventory={this.state.inventory}
                        handleRequest={this.handleRequest}
                    />


                    {/* <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                    <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                    <button onClick={() => this.changeFilter('electronics')}>Electronics</button> */}
                </div>
                <div className="DateHolder">
                    {/* <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleDateChange}
                    /> */}
                </div>
                <div className="CartHolder">
                    <Cart carts={this.state.cart} handlePostSuccess={this.handlePostSuccess} />
                </div>

            </div>
        );
    }
}


export default User;
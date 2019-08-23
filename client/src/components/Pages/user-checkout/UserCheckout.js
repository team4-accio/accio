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
    constructor(props) {
        super(props)
        this.state = {

            filteredInventory: [],
            inventory: [],
            cart: [],
            startDate: new Date(),
        }
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
        this.closeCollapse();
    }

    handlePostSuccess(data) {
        console.log("handlepost")
        console.log(data)
        M.toast({
            html: ('Checked out'),
            classes: 'greenToast'
        })
        this.updateOnNewItem(data.item)
        // set data to variable 
        // look for id for changed item from response
        // map
        // set to data variable
        // update state
    }

    updateOnNewItem() {
        this.getItems();
        this.closeCollapse()
        // var elems = document.querySelectorAll('.collapsible');
        // var instance = M.Collapsible.init(elems[0]);
        // console.log(elems)
        // for (var i = 0; i < elems[0].children.length; i++) {
        //     // console.log(elems[i]);

        //     // var instance = M.Collapsible.getInstance(elems[i]);

        //     console.log(instance)
        //     instance.close(i)
        // }

    }

    closeCollapse() {
        var elems = document.querySelectorAll('.collapsible');
        var instance = M.Collapsible.init(elems[0]);
        console.log(elems)
        for (var i = 0; i < elems[0].children.length; i++) {
            // console.log(elems[i]);

            // var instance = M.Collapsible.getInstance(elems[i]);

            console.log(instance)
            instance.close(i)
        }
    }

    // displayCart() {
    // console.log
    // }

    render() {
        console.log("rendered")
        // console.log(this.props.inventory)
        return (
            <div className="checkoutHolder">
                <div className="CollapseHolder">

                    <CollapseBody
                        inventory={this.state.inventory}
                        handleRequest={this.handleRequest}
                    />


                    {/* <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                    <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                    <button onClick={() => this.changeFilter('electronics')}>Electronics</button> */}
                    {/* <div className="CartHolder"> */}
                    <Cart
                        carts={this.state.cart}
                        sessionToken={this.props.sessionToken}
                        sessionUser={this.props.sessionUser}
                        handlePostSuccess={(data) => this.handlePostSuccess(data)}  {...this.state} />
                    {/* </div> */}
                </div>



            </div>
        );
    }
}


export default User;
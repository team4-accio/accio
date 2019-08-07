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
        inventory: []
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

    // changeFilter = (action) => {
    //     console.log("change filter")
    //     var currentInventory = this.state.inventory;
    //     if (action === 'Laptop - Mac') {
    //         console.log("conditional laptop")
    //         console.log(currentInventory.filter(each => each.category === 'Laptop - Mac'))
    //         this.setState({
    //             filteredinventory: currentInventory.filter(each => each.category === 'Laptop - Mac')
    //         })
    //         // } else if (action === 'checkedOut') {
    //         //     this.setState({
    //         //         filteredinventory: this.state.inventory.filter(each => each.checkedOut === true)
    //         //     })
    //     }
    //     else if (action === 'electronics') {
    //         this.setState({
    //             filteredinventory: this.state.inventory.filter(each => each.type === 'electronics')
    //         })
    //     }

    render() {
        console.log("rendered")
        console.log(this.state.inventory)
        return (
            <div className="App">
                <CollapseBody inventory={this.state.inventory} />


                {/* <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                    <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                    <button onClick={() => this.changeFilter('electronics')}>Electronics</button> */}


            </div>
        );
    }
}


export default User;
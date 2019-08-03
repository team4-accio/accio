// import React, { Component } from "react";
import React from "react";
import M from "materialize-css";
import Card from "./local-components/Card";
// import CollapseBody from "./local-components/CollapseBody";
import axios from "axios";
// import testArr from "./testArr.json"

// var inventory = [
//     {
//         name: 'projector',
//         type: 'electronic',
//         checkedOut: false,
//     },
//     {
//         name: 'laptop',
//         type: 'electronics',
//         checkedOut: true,
//     },
//     {
//         name: 'A great day',
//         type: 'book',
//         checkedOut: false,
//     },
//     {
//         name: 'A great winter',
//         type: 'book',
//         checkedOut: true,
//     }
// ]

class User extends React.Component {

    state = {

        filteredinventory: [],
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

    changeFilter = (action) => {
        console.log("change filter")
        var currentInventory = this.state.inventory;
        if (action === 'Laptop - Mac') {
            console.log("conditional laptop")
            console.log(currentInventory.filter(each => each.category === 'Laptop - Mac'))
            this.setState({
                filteredinventory: currentInventory.filter(each => each.category === 'Laptop - Mac')
            })
            // } else if (action === 'checkedOut') {
            //     this.setState({
            //         filteredinventory: this.state.inventory.filter(each => each.checkedOut === true)
            //     })
        }
        //     else if (action === 'electronics') {
        //         this.setState({
        //             filteredinventory: this.state.inventory.filter(each => each.type === 'electronics')
        //         })
        //     }
    }
    render() {
        console.log("rendered")
        return (
            <div className="App">

                <ul className="collapsible">
                    <li>
                        <div className="collapsible-header" onClick={() => this.changeFilter('Laptop - Mac')}>
                            <i className="material-icons">filter_drama</i>Laptop - Mac
                        </div>
                        <div className="collapsible-body">
                            <span>
                                {this.state.filteredinventory.map((item, index) => {

                                    return (
                                        <div key={index}>
                                            {/* <p>{each.name}</p> */}
                                            <Card category={item.category} condition={item.condition} />
                                        </div>
                                    )
                                })}
                            </span>
                        </div>
                    </li>
                </ul>

                {/* <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                    <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                    <button onClick={() => this.changeFilter('electronics')}>Electronics</button> */}


            </div>
        );
    }
}


export default User;
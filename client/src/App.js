import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import AdminInventory from "./components/Pages/admin-inventory/AdminInventory";
import TestPage from "./components/testPage/testPage";
import AdminAction from "./components/Pages/admin-action/AdminAction"
import AdminUsers from "./components/Pages/admin-userlist/AdminUserList";
import UserCheckout from "./components/Pages/user-checkout/UserCheckout";
import Home from "./components/Pages/Home";
import M from "materialize-css";
import axios from "axios";

class App extends React.Component {

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
        // console.log(id);
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
        return (
            <Router>
                <div>
                    {/* THIS IS FOR TESTING, CHANGE ROUTING / EXPRESS LATER */}
                    <Wrapper>
                        <Route exact path="/" component={Home} />
                        <Route exact path="/admin/action" component={AdminAction} />
                        <Route exact path="/admin/inventory" component={AdminInventory} />
                        <Route exact path="/admin/users" component={AdminUsers} />
                        {/* <Route exact path="/user-checkout" component={UserCheckout} /> */}
                        <Route
                            exact
                            path={`/user-checkout`}
                            render={(props) =>
                                <UserCheckout
                                    {...props}
                                    inventory={this.state.inventory}
                                    handleRequest={this.handleRequest}
                                // key={this.state.key}
                                />
                            }
                        />
                    </Wrapper>
                </div>
            </Router>
        );
    }
}
export default App;

import React, { Component } from 'react';
import "./style.css";
import Card from "../Card";


class CollapseBody extends Component {
    constructor(props) {

        super(props);
        // console.log(props)
        this.state = {
            filteredInventory: [],
            categories: ["Laptop - Mac", "Laptop - PC", "iPad", "keyboard", "mouse"]

        }

    }

    changeFilter = (action) => {
        // console.log("change filter" + action)
        // console.log("this.props.inventory" + this.props.inventory)
        var currentInventory = this.props.inventory;
        if (action === 'Laptop - Mac') {
            // console.log("conditional laptop Mac")
            console.log(currentInventory.filter(each => each.category === 'Laptop - Mac'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'Laptop - Mac' && each.available === true)
            })
        } else if (action === 'Laptop - PC') {
            // console.log("conditional laptop PC")
            console.log(currentInventory.filter(each => each.category === 'Laptop - PC'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'Laptop - PC' && each.available === true)
            })
        } else if (action === 'iPad') {
            // console.log("conditional ipad")
            console.log(currentInventory.filter(each => each.category === 'iPad'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'iPad' && each.available === true)
            })
        } else if (action === 'keyboard') {
            // console.log("conditional ipad")
            console.log(currentInventory.filter(each => each.category === 'keyboard'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'keyboard' && each.available === true)
            })
        } else if (action === 'mouse') {
            // console.log("conditional ipad")
            console.log(currentInventory.filter(each => each.category === 'mouse'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'mouse' && each.available === true)
            })
        }
    }

    render() {
        // console.log(this.props.filteredInventory)
        return (

            <div className="row">
                <ul className="collapsible">

                    {this.state.categories.map((item, index) => {
                        return (
                            <li key={index}>
                                {/*  */}
                                <div className="collapsible-header" onClick={() => this.changeFilter(item)}>
                                    <p>{item}</p>
                                </div>
                                <div className="collapsible-body">
                                    <span>
                                        {this.state.filteredInventory.map((item2, index) => {

                                            return (
                                                <div key={index}>

                                                    <Card category={item2.category}
                                                        condition={item2.condition}
                                                        description={item2.description}
                                                        id={item2._id}
                                                        name={item2.name}
                                                        handleRequest={this.props.handleRequest} />
                                                </div>
                                            )
                                        })}
                                    </span>
                                </div>
                            </li>

                        )
                    })
                    }

                </ul>
            </div>

        )
    };
};

export default CollapseBody;
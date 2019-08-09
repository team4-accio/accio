import React, { Component } from 'react';
// import "./style.css";
import Card from "../Card";


class CollapseBody extends Component {
    constructor(props) {

        super(props);
        // console.log(props)
        this.state = {
            filteredInventory: [],
            categories: ["Laptop - Mac", "Laptop - PC", "iPad",]

        }

    }

    changeFilter = (action) => {
        // console.log("change filter" + action)
        // console.log("this.props.inventory" + this.props.inventory)
        var currentInventory = this.props.inventory;
        if (action === 'Laptop - Mac') {
            console.log("conditional laptop Mac")
            console.log(currentInventory.filter(each => each.category === 'Laptop - Mac'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'Laptop - Mac')
            })
        } else if (action === 'Laptop - PC') {
            console.log("conditional laptop PC")
            console.log(currentInventory.filter(each => each.category === 'Laptop - PC'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'Laptop - PC')
            })
        } else if (action === 'iPad') {
            console.log("conditional ipad")
            console.log(currentInventory.filter(each => each.category === 'iPad'))
            this.setState({
                filteredInventory: currentInventory.filter(each => each.category === 'iPad')
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
                                <div className="collapsible-header" onClick={() => this.changeFilter(item)}>
                                    <h1>{item}</h1>
                                </div>
                                <div className="collapsible-body">
                                    <span>
                                        {this.state.filteredInventory.map((item2, index) => {

                                            return (
                                                <div key={index}>

                                                    <Card category={item2.category} condition={item2.condition} id={item2._id} handleRequest={this.props.handleRequest} />
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
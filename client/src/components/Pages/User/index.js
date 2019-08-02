import React from 'react';
import M from "materialize-css";
import Card from "./local-components/Card";


// import logo from './logo.svg';
// import './App.css';

var inventory = [
    {
        name: 'projector',
        type: 'electronic',
        checkedOut: false,
    },
    {
        name: 'laptop',
        type: 'electronics',
        checkedOut: true,
    },
    {
        name: 'A great day',
        type: 'book',
        checkedOut: false,
    },
    {
        name: 'A great winter',
        type: 'book',
        checkedOut: true,
    }
]




class User extends React.Component {

    state = {
        inventory: inventory,
        filteredinventory: []
    }

    // Auto Init allows you to initialize all of the Materialize Components with a single function call. It is important to note that you cannot pass in options using this method.

    componentDidMount() {
        this.changeFilter(inventory)
        M.AutoInit();
    }

    changeFilter = (action) => {
        if (action === 'checkedIn') {
            this.setState({
                filteredinventory: this.state.inventory.filter(each => each.checkedOut === false)
            })
        } else if (action === 'checkedOut') {
            this.setState({
                filteredinventory: this.state.inventory.filter(each => each.checkedOut === true)
            })
        }

        else if (action === 'electronics') {
            this.setState({
                filteredinventory: this.state.inventory.filter(each => each.type === 'electronics')
            })
        }
    }

    render() {
        return (
            <div className="App">
                <ul className="collapsible">
                    <li>
                        <div class="collapsible-header" onClick={() => this.changeFilter('checkedIn')}>
                            <i class="material-icons">filter_drama</i>Laptop
                        </div>
                        <div class="collapsible-body">
                            <span>
                                {this.state.filteredinventory.map((item, index) => {

                                    return (
                                        <div key={index}>
                                            {/* <p>{each.name}</p> */}
                                            <Card product={item} />
                                        </div>
                                    )
                                })}
                            </span>
                        </div>
                    </li>
                </ul>

                <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                <button onClick={() => this.changeFilter('electronics')}>Electronics</button>


            </div>
        );
    }
}


export default User;
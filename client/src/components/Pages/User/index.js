import React from 'react';
import M from "materialize-css";
import Card from "./local-components/Card";


// import logo from './logo.svg';
// import './App.css';

var items = [
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
        items: items,
        filteredItems: []
    }

    // Auto Init allows you to initialize all of the Materialize Components with a single function call. It is important to note that you cannot pass in options using this method.

    componentDidMount() {
        this.changeFilter(items)
        M.AutoInit();
    }

    changeFilter = (action) => {
        if (action === 'checkedIn') {
            this.setState({
                filteredItems: this.state.items.filter(each => each.checkedOut === false)
            })
        } else if (action === 'checkedOut') {
            this.setState({
                filteredItems: this.state.items.filter(each => each.checkedOut === true)
            })
        }

        else if (action === 'electronics') {
            this.setState({
                filteredItems: this.state.items.filter(each => each.type === 'electronics')
            })
        }
    }

    render() {
        return (
            <div className="App">


                <button onClick={() => this.changeFilter('checkedIn')}>Checked in</button>
                <button onClick={() => this.changeFilter('checkedOut')}>Checked out</button>
                <button onClick={() => this.changeFilter('electronics')}>Electronics</button>

                {this.state.filteredItems.map((each, index) => {
                    return (
                        <div key={index}>
                            {/* <p>{each.name}</p> */}
                            <Card />
                            {/* <div class="row">
                                <div class="col s12 m6">
                                    <div class="card blue-grey darken-1">
                                        <div class="card-content white-text">
                                            <span class="card-title">Card Title</span>
                                            <p>{each.name}</p>
                                        </div>
                                        <div class="card-action">
                                            <a href="#">This is a link</a>
                                            <a href="#">This is a link</a>
                                        </div>
                                    </div>
                                </div>
                            </div> */}
                        </div>
                    )
                })}
            </div>
        );
    }
}


export default User;
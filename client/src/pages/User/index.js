import React from 'react';
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
                            <p>{each.name}</p>
                        </div>
                    )
                })}
            </div>
        );
    }
}


export default User;

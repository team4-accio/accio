import React, { Component } from 'react';
// import "./style.css";

class Cart extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        // this.state = {
        //     cart: []
        // }
    }
    render() {
        return (
            // <h2>hi</h2>
            <div className="row">
                {this.props.carts.map((cart, index) => {
                    return (
                        <li key={index}>
                            <div className="col s12 m6">
                                <div className="card blue-grey darken-1">
                                    <div className="card-content white-text">
                                        <span className="card-title"><p>{cart.name} </p></span>

                                    </div>
                                    <div className="card-action">

                                        <p>{cart.condition}</p>
                                        {/* <a href="#">This is a link</a>
                        <a href="#">This is a link</a> */}
                                    </div>
                                </div>
                            </div>
                        </li>
                    )
                })}
            </div>
        )
    }

}


export default Cart
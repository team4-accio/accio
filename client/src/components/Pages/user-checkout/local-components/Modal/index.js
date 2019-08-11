import React, { Component } from 'react';
import CartCard from "../CartCard";
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
            <div className="modalHolder">
                <a className="waves-effect waves-light btn modal-trigger" href="#modal1">View Cart</a>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <div className="row">
                            {this.props.carts.map((cart, index) => {
                                return (
                                    <div key={index}>
                                        <CartCard name={cart.name} condition={cart.condion} />
                                        {/* <div className="col s12 m6">
                                            <div className="card blue-grey darken-1">
                                                <div className="card-content white-text">
                                                    <span className="card-title"><p>{cart.name} </p></span>

                                                </div>
                                                <div className="card-action" >

                                                    <p>{cart.condition}</p>
                                                   
                                                </div>
                                            </div>
                                        </div> */}
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Checkout</a>
                    </div>
                </div>
            </div>
        )
    }

}


export default Cart
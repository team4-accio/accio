import React, { Component } from 'react';
import CartCard from "../CartCard";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
// import ptBR from 'date-fns/locale/pt-BR';
// registerLocale('pt-BR', ptBR);
// import "./style.css";

class Cart extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            startDate: new Date(),
        }
    }

    onDateChange() {
        console.log("date change called")
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
                                    <CartCard name={cart.name} condition={cart.condion} key={index} />
                                )
                            })}


                        </div>
                    </div>
                    <DatePicker
                        selected={this.state.startDate}
                        onChange={this.handleDateChange}
                    />
                    <div className="modal-footer">
                        <a href="#!" className="modal-close waves-effect waves-green btn-flat">Checkout</a>
                    </div>
                </div>
            </div>
        )
    }

}


export default Cart
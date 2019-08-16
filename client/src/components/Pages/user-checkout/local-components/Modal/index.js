import React, { Component } from 'react';
import CartCard from "../CartCard";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
// import ptBR from 'date-fns/locale/pt-BR';
// registerLocale('pt-BR', ptBR);
import "./styles.css";



class Cart extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            returnDate: new Date(),
        }
        this.handleDateChange = this.handleDateChange.bind(this);
    }

    // onDateChange() {
    //     console.log("date change called")
    // }
    handleDateChange(date) {
        this.setState({
            returnDate: date
        });
        // console.log(date);
    }

    handleCheckout() {
        // var idsOnly = []
        // for (let i = 0; i < this.props.carts.length; i++) {
        //     idsOnly.push(this.props.carts[i]._id)
        // }

        var payload = {
            items: this.props.carts.map(each => each._id),
            out: new Date(),
            return: this.state.returnDate,
            status: "pending",
            user: "5d535d43a598fb423838ea4a"
        }
        console.log(payload)
        axios.post("/api/checkouts", payload,
            {
                headers: {
                    authorization: "89873270-be2f-11e9-ace9-0b90993bf7cc"
                }
            }
        ).then(function (data) {
            console.log(data)
            this.props.handlePostSuccess(data);
        }.bind(this));

        // ultimately update this to db response

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
                        selected={this.state.returnDate}
                        onChange={this.handleDateChange}
                    />
                    <div className="modal-footer">
                        <button onClick={() => this.handleCheckout()} className="modal-close waves-effect waves-green btn-flat">Checkout</button>
                    </div>
                </div>
            </div>
        )
    }

}


export default Cart
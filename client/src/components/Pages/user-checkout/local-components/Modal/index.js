import React, { Component } from 'react';
import CartCard from '../CartCard';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import axios from 'axios';
// import ptBR from 'date-fns/locale/pt-BR';
// registerLocale('pt-BR', ptBR);
import './styles.css';

class Cart extends Component {
    constructor(props) {
        console.log(props);
        super(props);
        this.state = {
            returnDate: new Date()
        };
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

    handleCheckout = event => {
        // event.preventDefault();
        // var idsOnly = []
        // for (let i = 0; i < this.props.carts.length; i++) {
        //     idsOnly.push(this.props.carts[i]._id)
        // }

        var payload = {
            items: this.props.carts.map(each => each._id),
            out: new Date(),
            return: this.state.returnDate,
            status: 'pending',
            user: this.props.sessionUser._id
            // props.sessionUser
        };
        console.log(payload);

        axios
            .post('/api/checkouts', payload, {
                headers: {
                    'x-session-token': this.props.sessionToken
                }
            })
            .then(
                function (data) {
                    console.log(data);
                    this.props.handlePostSuccess(data);
                }.bind(this)
            );

        // ultimately update this to db response
    };

    render() {
        console.log(this.props)
        let viewHeight = window.innerHeight;
        console.log(viewHeight)
        return (
            // <h2>hi</h2>
            <div className="modalHolder">
                {
                    this.props.carts.length > 0
                        ? <div className="fixed-action-btn click-to-toggle">
                            <a className="btn-floating btn-large blue modal-trigger pulse" href="#modal1">
                                <i className="large material-icons">shopping_cart</i>
                            </a>
                        </div>
                        : null
                }


                <div id="modal1" className="modal bottom-sheet">
                    <div className=" row modal-header">
                        <div className='left'>
                            <i className="material-icons blue-text">today</i>
                            <DatePicker
                                selected={this.state.returnDate}
                                onChange={this.handleDateChange}
                            />
                        </div>

                        <a
                            href="#!"
                            onClick={() => this.handleCheckout()}
                            className="modal-close waves-effect waves-green btn-flat right"
                        >
                            Checkout
                        </a>
                    </div>
                    <div className="modal-content" style={{ "min-height": '300px' }}>

                        <div className="row">
                            {this.props.carts.map((cart, index) => {
                                console.log(cart)
                                return (
                                    <CartCard
                                        name={cart.name}
                                        category={cart.category}
                                        condition={cart.condition}
                                        key={index}
                                        {...this.state}
                                    />
                                );
                            })}
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default Cart;

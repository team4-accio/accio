import React, { Component } from 'react';
import API from '../utils/API';
import './style.css';

class Login extends Component {
    state = {
        email: '',
        password: ''
    };

    handleChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    handleSubmit = event => {
        event.preventDefault();

        API.login({
            email: this.state.email,
            password: this.state.password
        })
            .then(res => {
                localStorage.setItem(
                    'sessionid',
                    res.headers['x-session-token']
                );
                this.props.login(res.data);
            })
            .catch(err => console.log(err));
    };

    render() {
        return (

            <div className="container">
                <div className="login">
                    <div className="row">
                        <form className="col s12" onSubmit={this.handleSubmit}>
                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        className="validate"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="email">Email</label>
                                </div>
                            </div>

                            <div className="row">
                                <div className="input-field col s12">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        className="validate"
                                        onChange={this.handleChange}
                                    />
                                    <label htmlFor="password">Password</label>
                                </div>
                            </div>
                            <p>
                                <button type="submit" className="btn btn-blue">
                                    Log in
                                </button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;

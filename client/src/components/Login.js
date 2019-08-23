import React, { Component } from 'react';
import API from '../utils/API';

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
                this.props.login(res.data);
                localStorage.setItem(
                    'sessionid',
                    res.headers['x-session-token']
                );
            })
            .catch(err => console.log(err));
    };

    render() {
        return (
            <div>
                <div className="container">
                    <div className="row">
                        <div className="col s10" />
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Email <span className="req">*</span>
                                <input
                                    type="email"
                                    name="email"
                                    className="width-50"
                                    onChange={this.handleChange}
                                />
                            </label>

                            <label>
                                Password
                                <input
                                    type="password"
                                    name="password"
                                    className="width-50"
                                    onChange={this.handleChange}
                                />
                            </label>
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

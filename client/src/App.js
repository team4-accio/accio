import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Wrapper from './components/Wrapper';
import AdminInventory from './components/Pages/admin-inventory/AdminInventory';
import AdminAction from './components/Pages/admin-action/AdminAction';
import AdminUsers from './components/Pages/admin-userlist/AdminUserList';
import UserCheckout from './components/Pages/user-checkout/UserCheckout';
import { Header, HeaderLink, Footer } from './components/common';
import Login from './components/Login';
import API from './utils/API';

class App extends Component {
    state = {
        links: {
            admin: ['action', 'inventory', 'users'],
            user: ['checkout'],
            placeholder: ['/admin/action', '/admin/inventory', '/admin/users', '/users/checkout'] // @TODO remove this and update HeaderLink component
        },
        init: true,
        loggedIn: false,
        path: '',
        sessionToken: '',
        sessionUser: {}
    };

    componentDidMount() {
        const sessionToken = localStorage.getItem('sessionid');
        const state = {};
        state.init = false; // Allow original path to be stored in state by avoiding redirect after initial render 
        state.path = window.location.pathname;

        if (sessionToken) {
            this.getSessionUser(sessionToken);
            state.sessionToken = sessionToken;
        }

        this.setState(state);
    }

    // Retrieve user if session token exists
    getSessionUser = (sessionToken) => {
        API.getSession(sessionToken)
            .then(res => this.setState({
                loggedIn: true,
                sessionUser: res.data
            }))
            .catch(err => console.log(err));
    };

    handleLogin = (user) => {
        this.setState({
            loggedIn: true,
            sessionUser: user
        });
    };

    // Render routes based on:
    // 1) user is logged in allow all app routes,
    // 2) user is logged out allow login route or
    // 3) initial render (don't render any components)
    // @TODO use switch statement to handle user role
    render() {
        if (Object.keys(this.state.sessionUser).length > 0) {
            return (
                <Router>
                    <Header>
                        {
                            this.state.links.placeholder.map(link =>
                                <HeaderLink link={link}>
                                    {link}
                                </HeaderLink>
                            )
                        }
                    </Header>
                    <Wrapper>
                        <Switch>
                            <Route
                                exact
                                path='/admin/action'
                                render={() => <AdminAction sessionUser={this.state.sessionUser} />}
                            />
                            <Route
                                exact
                                path='/admin/inventory'
                                render={() => <AdminInventory sessionUser={this.state.sessionUser} />}
                            />
                            <Route
                                exact
                                path='/admin/users'
                                render={() => <AdminUsers sessionUser={this.state.sessionUser} />}
                            />
                            <Route
                                exact
                                path='/users/checkout'
                                render={() => <UserCheckout sessionUser={this.state.sessionUser} />}
                            />
                            <Route render={() => <Login login={this.handleLogin} />} />
                        </Switch>
                    </Wrapper>
                    <Footer />
                </Router>
            );
        } else if (!this.state.init) {
            return (
                <Router>
                    <Header />
                    <Wrapper>
                        <Switch>
                            <Route render={() => <Login login={this.handleLogin} />} />
                        </Switch>
                    </Wrapper>
                    <Footer />
                </Router>
            );
        }
        else {
            return (<></>);
        }
    }
}

export default App;

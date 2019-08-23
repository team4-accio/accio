import React, { Component } from 'react';
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom';
import { Header, HeaderLink, Footer, Wrapper } from './components/common';
import {
    AdminAction,
    AdminDashboard,
    AdminInventory,
    AdminUserList,
    UserCheckout,
    UserDashboard
} from './components/Pages';
import Login from './components/Login';
import API from './utils/API';

class App extends Component {
    state = {
        links: {
            admin: ['dashboard', 'action', 'inventory', 'users'],
            user: ['dashboard', 'checkout']
        },
        init: true,
        path: '',
        sessionToken: '',
        sessionUser: {},
        switchState: 'default' // enums: ['admin', 'user', 'login', 'default']
    };

    componentDidMount() {
        const sessionToken = localStorage.getItem('sessionid');
        const state = {};
        state.init = false; // Allow original path to be stored in state by avoiding redirect after initial render
        state.path = window.location.pathname;

        if (sessionToken) {
            this.getSessionUser(sessionToken);
            state.sessionToken = sessionToken;
        } else {
            state.switchState = 'login';
        }

        this.setState(state);
    }

    // Retrieve user if session token exists
    getSessionUser = sessionToken => {
        API.getSession(sessionToken)
            .then(res =>
                this.setState({
                    sessionUser: res.data,
                    switchState: res.data.role
                })
            )
            .catch(err => {
                console.log(err);

                this.setState({
                    switchState: 'login'
                });
            });
    };

    // Event handler to update state on login
    handleLogin = user => {
        this.setState({
            sessionUser: user,
            switchState: user.role
        });
    };

    // Render admin nav and routes
    renderAdminRoutes = () => (
        <Router>
            <Header>
                {this.state.links.admin.map(link => (
                    <HeaderLink link={'/' + link}>{link}</HeaderLink>
                ))}
            </Header>
            <Wrapper>
                <Switch>
                    <Route
                        exact
                        path="/dashboard"
                        render={() => (
                            <AdminDashboard
                                sessionToken={this.state.sessionToken}
                                sessionUser={this.state.sessionUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/action"
                        render={() => (
                            <AdminAction
                                sessionToken={this.state.sessionToken}
                                sessionUser={this.state.sessionUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/inventory"
                        render={() => (
                            <AdminInventory
                                sessionToken={this.state.sessionToken}
                                sessionUser={this.state.sessionUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/users"
                        render={() => (
                            <AdminUserList
                                sessionToken={this.state.sessionToken}
                                sessionUser={this.state.sessionUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={() => (
                            <Redirect
                                to={
                                    this.state.path === '/login'
                                        ? '/dashboard'
                                        : this.state.path
                                }
                            />
                        )}
                    />
                    <Route render={() => <Redirect to={'/dashboard'} />} />
                </Switch>
            </Wrapper>
            <Footer />
        </Router>
    );

    // Render user nav and routes
    renderUserRoutes = () => (
        <Router>
            <Header>
                {this.state.links.user.map(link => (
                    <HeaderLink link={'/' + link}>{link}</HeaderLink>
                ))}
            </Header>
            <Wrapper>
                <Switch>
                    <Route
                        exact
                        path="/dashboard"
                        render={() => (
                            <UserDashboard
                                sessionToken={this.state.sessionToken}
                                sessionUser={this.state.sessionUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/checkout"
                        render={() => (
                            <UserCheckout
                                sessionToken={this.state.sessionToken}
                                sessionUser={this.state.sessionUser}
                            />
                        )}
                    />
                    <Route
                        exact
                        path="/login"
                        render={() => (
                            <Redirect
                                to={
                                    this.state.path === '/login'
                                        ? '/dashboard'
                                        : this.state.path
                                }
                            />
                        )}
                    />
                    <Route render={() => <Redirect to={'/dashboard'} />} />
                </Switch>
            </Wrapper>
            <Footer />
        </Router>
    );

    // Render login route
    renderLoginRoutes = () => (
        <Router>
            <Header />
            <Wrapper>
                <Switch>
                    <Route
                        exact
                        path="/login"
                        render={() => <Login login={this.handleLogin} />}
                    />
                    <Route render={() => <Redirect to="/login" />} />
                </Switch>
            </Wrapper>
            <Footer />
        </Router>
    );

    render() {
        switch (this.state.switchState) {
            case 'admin':
                return this.renderAdminRoutes();
            case 'user':
                return this.renderUserRoutes();
            case 'login':
                return this.renderLoginRoutes();
            case 'default':
            default:
                return <></>;
        }
    }
}

export default App;

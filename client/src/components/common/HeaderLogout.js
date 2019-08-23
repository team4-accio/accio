import React from "react";
import axios from "axios";
import { Link, Redirect } from 'react-router-dom';

class HeaderLogout extends React.Component {
    state = {
        id: ""
    };

    handleChange = event => {
        // Getting the value and name of the input which triggered the change
        const { name, value } = event.target;
        // Updating the input's state
        this.setState({
            [name]: value
        });
    };

    render() {
        return (
            <li>
                <Link to={"/login"} onClick={this.props.logout} className="nav-link">
                    <i className="material-icons left">exit_to_app</i>
                    <span className='hide-on-med-and-down'>Logout</span>
                </Link>
            </li>
        );
    }
}

export default HeaderLogout;

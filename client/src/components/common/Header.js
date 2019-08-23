import React from 'react';
import { Link } from 'react-router-dom';
import HeaderLogout from './HeaderLogout'

function Header(props) {
    return (
        <nav className="navbar">
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="left">
                    <HeaderLogout logout={props.logout} />
                </ul>
                <span className="brand-logo center">
                    <Link to="/">Accio</Link>
                </span>
                <ul id="nav-mobile" className="right">
                    {props.children}
                </ul>
            </div>
        </nav>
    );
}

export default Header;

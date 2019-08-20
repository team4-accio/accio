import React from 'react';
import { Link } from 'react-router-dom';

function Header(props) {
    return (
        <nav className="navbar">
            <div className="nav-wrapper">
                <span className="brand-logo">
                    <Link to="/">Accio</Link>
                </span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {props.children}
                </ul>
            </div>
        </nav>
    );
}

export default Header;

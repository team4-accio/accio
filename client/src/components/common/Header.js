import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import "./style.css";

const spanFix = {
    display: "inline",
    position: "unset" 
  };

  const imageFix = {
    width: "10%" 
  };

function Header(props) {
    return (
        <nav className="navbar">
            <div className="nav-wrapper">
                <span className="brand-logo" style={spanFix}>
                    <Link to="/">
                    <img src={logo} alt="Logo" style={imageFix} />
                    </Link>
                </span>
                <ul id="nav-mobile" className="right hide-on-med-and-down">
                    {props.children}
                </ul>
            </div>
        </nav>
    );
}

export default Header;

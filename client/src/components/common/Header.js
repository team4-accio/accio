import React from 'react';
import logo from './logo.png';
import { Link } from 'react-router-dom';
import HeaderLogout from './HeaderLogout'
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
                <ul id="nav-mobile" className="left">
                    <HeaderLogout logout={props.logout} />
                </ul>
                <span className="brand-logo" style={spanFix}>
                    <Link to="/">
                    <img src={logo} alt="Logo" style={imageFix} />
                    </Link>
                </span>
                <ul id="nav-mobile" className="right">
                    {props.children}
                </ul>
            </div>
        </nav>
    );
}

export default Header;

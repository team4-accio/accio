import React from 'react';
import logo from '../../utils/images/logo.png';
import { Link } from 'react-router-dom';
import HeaderLogout from './HeaderLogout'
import "./style.css";

const spanFix = {
    display: "inline",
    position: "unset"
};

const imageFix = {
    width: "106px"
};



function Header(props) {
    console.log(props)
    return (
        <nav className="navbar">
            <div className="nav-wrapper">
                <ul id="nav-mobile" className="left">
                    {
                        localStorage.getItem("sessionid") === null
                            ? <li>
                                <Link to="/">
                                    <i className="material-icons left">open_in_browser</i>
                                    <span className='hide-on-med-and-down'>Login</span>
                                </Link>
                            </li>
                            : <HeaderLogout logout={props.logout} />

                    }

                </ul>
      
                <Link to="/">
                    <img src={logo} alt="Logo" className="brand-logo center" style={imageFix} />
                </Link>

                <ul id="nav-mobile" className="right">
                    {props.children}
                </ul>
            </div>
        </nav>
    );
}

export default Header;

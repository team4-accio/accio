import React from 'react';
import { Link } from 'react-router-dom';

function HeaderLink(props) {
    return (
        <li>
            <Link to={props.link} className="nav-link">
                {props.children}
            </Link>
        </li>
    );
}

export default HeaderLink;

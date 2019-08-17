import React from 'react';

function HeaderLink(props) {
    return (
        <li>
            <a href={props.link}>{props.children}</a>
        </li>
    );
};

export default HeaderLink;

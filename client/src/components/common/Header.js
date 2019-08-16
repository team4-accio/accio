import React from 'react';

function Header(props) {
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <a href="/" className="brand-logo">
          <span>Accio</span>
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          {props.children}
        </ul>
      </div>
    </nav>
  );
};

export default Header;

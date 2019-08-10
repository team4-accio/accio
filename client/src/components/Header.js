import React from "react";

function Header() {
  return (
    <nav className="navbar">
      <div className="nav-wrapper">
        <a href="#" className="brand-logo">
          Logo
        </a>
        <ul id="nav-mobile" className="right hide-on-med-and-down">
          <li className="active">
            <a href="#">Links</a>
          </li>
          <li>
            <a href="#">Links-01</a>
          </li>
          <li>
            <a href="#">Links-02</a>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Header;
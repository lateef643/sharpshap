import React from "react";
import "./Header.scss";
import logo from "../../assets/images/cico-logo.svg";

const Header = (props) => (
  <div className="header">
    <img src={logo} className="header__logo" />
  </div>
);

export default Header;
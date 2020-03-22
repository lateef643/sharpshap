import React from "react";
import "./Header.scss";
import StatusBar from "../partials/StatusBar";
import logo from "../../assets/images/cico-logo.svg";

const Header = (props) => (
  <div className="header">
    <div className="logo-box">
      <img src={logo} className="header__logo" alt="Cico payments logo" />      
    </div>
    <StatusBar />
  </div>
);

export default Header;
import React from "react";
import { Link } from "react-router-dom";
import "./Header.scss";
import StatusBar from "../partials/StatusBar";
import logo from "../../assets/images/cico-logo.svg";
import user from "../../assets/images/user.svg"

const Header = (props) => (
  <div className="header">
    <div className="header-container">
      <div className="logo-box">
        <img src={logo} className="header__logo" alt="Cico payments logo" />      
      </div>
      <span className="profile">
        <img src={user} />
        <span>
          <span className="one">Manage Profile</span>
          <span className="two">
            <Link to="/profile">Edit Profile</Link>
            <Link to="/profile">Change Password</Link>
          </span>
        </span>  
      </span>
    </div>
    <StatusBar />
  </div>
);

export default Header;
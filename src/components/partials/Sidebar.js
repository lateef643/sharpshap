import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import './Sidebar.scss';
import avatar from "../../assets/images/user.svg";
import speedometer from "../../assets/images/speedometer.svg";
import user from "../../assets/images/user-icon.svg";
import data from "../../assets/images/data.svg";
import terminal from "../../assets/images/payment-terminal.svg";
import wallet from "../../assets/images/digital-wallet.svg";
import { startLogout } from "../../actions/auth";

export const Sidebar = ({ firstname, lastname, id, startLogout  }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    startLogout();
  };

  return (
  <div className="sidebar">
    <div className="sidebar__profile">
      <img src={avatar} className="sidebar__profile__img" alt="user's avatar" />
      <p className="sidebar__profile__name">{`${firstname} ${lastname}`}</p>
      <p className="sidebar__profile__id">ID: {id}</p>
      <button className="sidebar__profile__edit" onClick={handleLogout}>Log out</button>
    </div>
    <div className="sidebar__links">
      <NavLink to="/dashboard" className="sidebar__links__link" >
        <img src={speedometer} className="sidebar__links__link__image" alt="speedometer icon" />
        <p className="sidebar__links__link__text">Dashboard</p>
      </NavLink>
      <div className="sidebar__links__link" >
        <img src={user} className="sidebar__links__link__image" alt="user icon" />
        <p className="sidebar__links__link__text">User Management</p>
        <div className="sidebar__links__link__secondary-links">
          <NavLink to="/add-user" className="sidebar__links__link__secondary-links__link">
          <p>Add User</p>
          </NavLink>
          <NavLink to="/list-users" className="sidebar__links__link__secondary-links__link">
            <p>List Users</p>
          </NavLink>         
        </div>
      </div>
      <NavLink to="/my-terminals" className="sidebar__links__link">
        <img src={terminal} className="sidebar__links__link__image" alt="terminals icon" />
        <p className="sidebar__links__link__text">My Terminals</p>
      </NavLink>
      <div className="sidebar__links__link">
        <img src={data} className="sidebar__links__link__image"  alt="data icon" />
        <p className="sidebar__links__link__text">Transactions</p>
        <div className="sidebar__links__link__secondary-links">
          <NavLink to="/new-transaction" className="sidebar__links__link__secondary-links__link">
            <p>New Transaction</p>
          </NavLink>
          <NavLink to="/transaction-log" className="sidebar__links__link__secondary-links__link">
            <p>Transactions Log</p>
          </NavLink>
        </div>
      </div>  
      <div to="my-wallet" className="sidebar__links__link">
        <img src={wallet} className="sidebar__links__link__image" alt="wallet icon" />
        <p className="sidebar__links__link__text">My Wallet</p>
        <div className="sidebar__links__link__secondary-links">
          <NavLink to="/wallet-log" className="sidebar__links__link__secondary-links__link">
            <p>Wallet Log</p>
          </NavLink>
          <NavLink to="/fund-wallet" className="sidebar__links__link__secondary-links__link">
            <p>Fund Wallet</p>
          </NavLink> 
          <NavLink to="/activity-log" className="sidebar__links__link__secondary-links__link">
            <p>Activity Log</p>
          </NavLink>
        </div>
      </div>
    </div>
  </div>
)};

const mapStateToProps = (state) => {
  return {
    firstname: state.auth.user.agent.first_name,
    lastname: state.auth.user.agent.last_name,
    id: state.auth.user.agent.wallet_no
  }
};

const mapDispatchToProps = dispatch => {
  return {
    startLogout: () => dispatch(startLogout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
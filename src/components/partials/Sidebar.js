import React from "react";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import avatar from "../../assets/images/user.svg";
import dashboard from "../../assets/images/dashboard.svg";
import phone from "../../assets/images/phone-contact.svg";
import user from "../../assets/images/user-2.svg";
import business from "../../assets/images/business.svg";
// import terminal from "../../assets/images/payment-terminal.svg";
import wallet from "../../assets/images/wallet-outlined.svg";
import { startLogout } from "../../actions/auth";
import styles from "./Sidebar.module.scss";

export const Sidebar = ({ firstname, lastname, id, startLogout }) => {
  const handleLogout = (e) => {
    e.preventDefault();
    startLogout();
  };

  return (
    <nav className={styles.navigation}>
      <input
        type="checkbox"
        className={styles.toggleCheckbox}
        id="navi-toggle"
      />
      <label htmlFor="navi-toggle" className={styles.toggleButton}>
        <span className={styles.hamburgerItem}></span>
      </label>
      <div className={styles.sidebar}>
        <div className={styles.profile}>
          <img
            src={avatar}
            className={styles.profileImage}
            alt="user's avatar"
          />
          <p className={styles.profileName}>{`${firstname} ${lastname}`}</p>
          <p className={styles.profileId}>Wallet ID: {id}</p>
          <button className={styles.logout} onClick={handleLogout}>
            Log out
          </button>
        </div>
        <div className={styles.links}>
          <NavLink to="/" className={styles.linkItem}>
            <img
              src={dashboard}
              className={styles.linkItemImage}
              alt="speedometer icon"
            />
            <p className={styles.linkItemText}>Dashboard</p>
          </NavLink>
          <div to="my-wallet" className={styles.linkItem}>
            <img
              src={wallet}
              className={styles.linkItemImage}
              alt="wallet icon"
            />
            <p className={styles.linkItemText}>My Wallet</p>
            <div className={styles.linkSecondary}>
              <NavLink
                to="/wallet-transfer"
                className={styles.linkSecondaryItem}
              >
                <p>Wallet Transfer</p>
              </NavLink>
              <NavLink to="/wallet-log" className={styles.linkSecondaryItem}>
                <p>Wallet Log</p>
              </NavLink>
              <NavLink to="/fund-wallet" className={styles.linkSecondaryItem}>
                <p>Fund Wallet</p>
              </NavLink>
              <NavLink to="/activity-log" className={styles.linkSecondaryItem}>
                <p>Activity Log</p>
              </NavLink>
            </div>
          </div>
          {/* <NavLink to="/my-terminals" className={styles.linkItem}>
            <img src={terminal} className={styles.linkItemImage} alt="terminals icon" />
            <p className={styles.linkItemText}>My Terminals</p>
          </NavLink> */}
          <div className={styles.linkItem}>
            <img
              src={business}
              className={styles.linkItemImage}
              alt="data icon"
            />
            <p className={styles.linkItemText}>Transactions</p>
            <div className={styles.linkSecondary}>
              <NavLink
                to="/new-transaction"
                className={styles.linkSecondaryItem}
              >
                <p>New Transaction</p>
              </NavLink>
              <NavLink
                to="/transaction-log"
                className={styles.linkSecondaryItem}
              >
                <p>Transactions Log</p>
              </NavLink>
            </div>
          </div>
          <NavLink to="/profile" className={styles.linkItem}>
            <img src={user} className={styles.linkItemImage} alt="user icon" />
            <p className={styles.linkItemText}>Profile</p>
          </NavLink>
          {/* <div className={styles.linkItem} >
            <img src={user} className={styles.linkItemImage} alt="user icon" />
            <p className={styles.linkItemText}>Profile</p>
            <div className={styles.linkSecondary}>
              <NavLink to="/add-user" className={styles.linkSecondaryItem}>
                <p>Add User</p>
              </NavLink>
              <NavLink to="/list-users" className={styles.linkSecondaryItem}>
                <p>List Users</p>
              </NavLink> 
              <NavLink to="/profile" className={styles.linkSecondaryItem}>
                <p>Change Password</p>
              </NavLink>        
            </div>
          </div> */}
          <NavLink to="/contact-us" className={styles.linkItem}>
            <img
              src={phone}
              className={styles.linkItemImage}
              alt="speedometer icon"
            />
            <p className={styles.linkItemText}>Contact Us</p>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => {
  return {
    firstname: state.auth.user.agent.first_name,
    lastname: state.auth.user.agent.last_name,
    id: state.auth.user.agent.wallet_no,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLogout: () => dispatch(startLogout()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);

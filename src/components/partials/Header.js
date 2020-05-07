import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBar from "../partials/StatusBar";
import logo from "../../assets/images/cico-logo.svg";
import notification from "../../assets/images/notification-svgrepo-com (1).svg";
import chat from "../../assets/images/chat-svgrepo-com (1).svg";
import user from "../../assets/images/user.svg";
import { connect } from "react-redux";
import styles from "./Header.module.scss";

const Header = ({ currentPage }) => {
  const notifications = [{
    title: "Dear Agent, please fund your wallets by making deposits to this account: CICOSERVE PAYMENTS 0001192798 SUNTRUST BANK, please note that this is only temporary as we are working towards automating the process shortly."
  }];
  const [toggleNotifications, setToggleNotifications] = useState(true);

  useEffect(() => {
    if (currentPage.heading !== "Dashboard" && currentPage.heading !== undefined) {
      setToggleNotifications(false);
    }
  }, [currentPage]);

  useEffect(() => {
    setTimeout(() => {
      setToggleNotifications(false);
    }, 10000);
  }, [])

  const handleToggleNotifications = () => {
    setToggleNotifications(!toggleNotifications)
  };
  
  return (
    <div className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.logoBox}>
          <img src={logo} className={styles.logo} alt="Cico payments logo" />      
        </div>
        <div className={styles.actions}>
          <span className={styles.notification} onClick={handleToggleNotifications}>
            <img src={notification} alt="notification bell" />
            <span className={styles.active}>1</span>
            {toggleNotifications ? 
            <div className={styles.notificationPanel}>
              <p className={styles.heading}>Notifications</p>
              {notifications.map((notification, index) => {
              return <div>
                <img src={chat} alt="chat icon" />
                <p key={index}>{notification.title}</p>
              </div>
              })}
            </div> : undefined}
          </span>
          <span className={styles.profile}>
            <img src={user} alt="User silhoutte"/>
            <span>
              <span className={styles.one}>Manage Profile</span>
              <span className={styles.two}>
                <Link to="/profile">Edit Profile</Link>
                <Link to="/profile">Change Password</Link>
              </span>
            </span>  
          </span>        
        </div>

      </div>
      <StatusBar />
    </div>
)};

const mapStateToProps = state => ({
  currentPage: state.page
});

export default connect(mapStateToProps)(Header);
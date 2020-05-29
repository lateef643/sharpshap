import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBar from "../partials/StatusBar";
// import NotificationsPanel from "../partials/NotificationsPanel";
import logo from "../../assets/images/cico-logo.svg";
import notification from "../../assets/images/notification-svgrepo-com (1).svg";
import chat from "../../assets/images/chat-svgrepo-com (1).svg";
import caution from "../../assets/images/warning-svgrepo-com.svg";
import user from "../../assets/images/user.svg";
import { connect } from "react-redux";
import styles from "./Header.module.scss";

const Header = ({ currentPage, isDefaultPassword }) => {
  const [notifications, setNotifications] = useState([{
    title: "Dear Agent, please fund your wallets by making deposits to this account: CICOSERVE PAYMENTS 0001192798 SUNTRUST BANK, please note that this is only temporary as we are working towards automating the process shortly."
  }]);
  const [toggleNotifications, setToggleNotifications] = useState(true);
  const [toggleProfile, setToggleProfile] = useState(false);
  useEffect(() => {
    if (currentPage.heading !== "Dashboard" && currentPage.heading !== undefined) {
      setToggleNotifications(false);
    }
  }, [currentPage]);

  useEffect(() => {
    if (isDefaultPassword === 1) {
      setNotifications([...notifications, {
        title: "Dear Agent, please create a secure password to proceed."
      }])
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setToggleNotifications(false);
    }, 10000);
  }, [])

  const handleToggleNotifications = () => {
    setToggleNotifications(!toggleNotifications)
  };
  
  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <img src={logo} className={styles.logo} alt="Cico payments logo" />      
        </div>
        <div className={styles.actions}>
          <span className={styles.notification} onClick={handleToggleNotifications}>
            <img src={notification} alt="notification bell" />
            <span className={styles.active}>{notifications.length}</span>
            {toggleNotifications ? 
            <div className={styles.notificationPanel}>
              <p className={styles.heading}>Notifications</p>
              <div>
                <img src={chat} alt="chat icon" />
                <p>{notifications[0].title}</p>
              </div>
              {notifications[1] ? <div>
                <img src={caution} alt="caution icon" />
                <p>{notifications[1].title}</p>
              </div> : undefined}
            </div> : undefined}
          </span>
          <span className={styles.profile}>
            <img src={user} onClick={() => {
              setToggleProfile(!toggleProfile)
            }} alt="User silhoutte"/>
            {toggleProfile ? 
            <span className={styles.submenu}>
              <Link to="/profile">Edit Profile</Link>
              <Link to="/profile">Change Password</Link>
            </span> : undefined}
          </span>        
        </div>

      </div>
      <StatusBar />
      {/* <NotificationsPanel /> */}
    </>
)};

const mapStateToProps = state => ({
  currentPage: state.page,
  isDefaultPassword: state.auth.user.is_default
});

export default connect(mapStateToProps)(Header);
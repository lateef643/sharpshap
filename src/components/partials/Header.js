import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import StatusBar from "../partials/StatusBar";
// import NotificationsPanel from "../partials/NotificationsPanel";
import { createNotification } from "../../actions/notification";
import logo from "../../assets/images/cico-logo.svg";
import notification from "../../assets/images/notification-svgrepo-com (1).svg";
// import chat from "../../assets/images/chat-svgrepo-com (1).svg";
import caution from "../../assets/images/warning-svgrepo-com.svg";
import check from "../../assets/images/check.svg";
import user from "../../assets/images/user.svg";
import { connect } from "react-redux";
import megaphone from "../../assets/images/announcement-svgrepo-com.svg";
import styles from "./Header.module.scss";

const Header = ({
  currentPage,
  isDefaultPassword,
  notifications,
  createNotification,
}) => {
  const [toggleNotifications, setToggleNotifications] = useState(true);
  const [toggleProfile, setToggleProfile] = useState(false);
  useEffect(() => {
    if (
      currentPage.heading !== "Dashboard" &&
      currentPage.heading !== undefined
    ) {
      setToggleNotifications(false);
    }
  }, [currentPage]);

  useEffect(() => {
    setToggleNotifications(true);
  }, [notifications]);

  useEffect(() => {
    if (isDefaultPassword === 1) {
      createNotification({
        title: "password",
        body: "Dear Agent, please create a secure password to proceed.",
      });
    }
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setToggleNotifications(false);
    }, 30000);
  }, []);

  const handleToggleNotifications = () => {
    setToggleNotifications(!toggleNotifications);
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.logoBox}>
          <img src={logo} className={styles.logo} alt="Cico payments logo" />
        </div>
        <div className={styles.actions}>
          <span
            className={styles.notification}
            onClick={handleToggleNotifications}
          >
            <img src={notification} alt="notification bell" />
            <span className={styles.active}>{notifications.length}</span>
            {toggleNotifications ? (
              <div className={styles.notificationPanel}>
                <p className={styles.heading}>Notifications</p>
                {notifications.map((notification, index) => {
                  return (
                    <div key={index}>
                      <img
                        src={
                          notification.status &&
                          notification.title === "transaction"
                            ? check
                            : notification.title === "password"
                            ? caution
                            : megaphone
                        }
                        alt=""
                      />
                      <p>{notification.body}</p>
                    </div>
                  );
                })}
              </div>
            ) : undefined}
          </span>
          <span className={styles.profile}>
            <img
              src={user}
              onClick={() => {
                setToggleProfile(!toggleProfile);
              }}
              alt="User silhoutte"
            />
            {toggleProfile ? (
              <span className={styles.submenu}>
                <Link to="/profile">Edit Profile</Link>
                <Link to="/profile">Change Password</Link>
              </span>
            ) : undefined}
          </span>
        </div>
      </div>
      <StatusBar />
      {/* <NotificationsPanel /> */}
    </>
  );
};

const mapStateToProps = (state) => ({
  currentPage: state.page,
  isDefaultPassword: state.auth.user.is_default,
  notifications: state.notification.notifications,
});

const mapDispatchToProps = (dispatch) => {
  return {
    createNotification: (payload) => dispatch(createNotification(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

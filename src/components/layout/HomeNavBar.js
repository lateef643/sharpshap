import React from "react";
import { NavLink } from "react-router-dom";

import logoWhite from "../../assets/icons/cico-logo-white.svg";
import logoMain from "../../assets/images/cico-logo-login.svg";

import styles from "./HomeNavBar.module.scss";

const HomeNavBar = ({ theme }) => {
  return (
    <nav className={styles.wrapper}>
      <ul className={styles.list}>
        <li className={`${styles.listItem} ${styles.listItemHome}`}>
          <NavLink
            to="/"
            className={`${styles.listItemLink} ${styles.listItemHomeLink}`}
          >
            <img
              className={styles.logo}
              src={theme === "white" ? logoWhite : logoMain}
              alt=""
            />
          </NavLink>
        </li>
        {/* <li className={`${styles.listItem} ${styles.listItemAbout}`}>
          <NavLink
            to="https://cico.ng"
            className={styles.listItemLink}
            activeClassName={styles.active}
          >
            About us
          </NavLink>
        </li>
        <li className={`${styles.listItem} ${styles.listItemLogin}`}>
          <NavLink
            to="/login"
            className={styles.listItemLink}
            activeClassName={styles.active}
          >
            Login
          </NavLink>
        </li>
        <li className={`${styles.listItem} ${styles.listItemRegister}`}>
          <NavLink
            to="/register"
            className={styles.listItemLink}
            activeClassName={styles.active}
          >
            Register
          </NavLink>
        </li> */}
      </ul>
    </nav>
  );
};

export default HomeNavBar;

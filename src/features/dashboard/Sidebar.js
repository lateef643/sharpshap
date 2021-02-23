import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import logo from "../../assets/images/cico-logo.svg";
import close from "../../assets/icons/closeModal.svg";

import styles from "./Sidebar.module.scss";

export const Sidebar = ({ agentType }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    window.addEventListener("resize", (e) => {
      setWidth(window.innerWidth);

      if (window.innerWidth > 1000) {
        setIsOpen(true);
      } else {
        setIsOpen(false);
      }
    });
  }, []);

  return (
    <>
      <div
        className={styles.toggle}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <svg
          className={styles.toggleIcon}
          viewBox="0 0 48 48"
          xmlns="http://www.w3.org/2000/svg"
          fill="#3e215b"
        >
          <path d="M41,14H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,14Z" />
          <path d="M41,26H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,26Z" />
          <path d="M41,38H7a2,2,0,0,1,0-4H41A2,2,0,0,1,41,38Z" />
        </svg>
      </div>
      {isOpen && (
        <div
          className={styles.overlay}
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        ></div>
      )}
      {(isOpen || width >= 1000) && (
        <div className={styles.sidebar}>
          <div className={styles.content}>
            <div className={styles.logoBox}>
              <img src={logo} className={styles.logo} alt="company logo" />
            </div>
            <div
              className={styles.toggleSidebarClose}
              onClick={() => {
                setIsOpen(!isOpen);
              }}
            >
              <img src={close} className={styles.iconClose} alt="" />
            </div>
            <nav className={styles.navigation}>
              <NavLink
                to="/overview"
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.navItemImage}
                >
                  <path d="M0.5 8.83333H7.16667V0.5H0.5V8.83333ZM0.5 15.5H7.16667V10.5H0.5V15.5ZM8.83333 15.5H15.5V7.16667H8.83333V15.5ZM8.83333 0.5V5.5H15.5V0.5H8.83333Z" />
                </svg>
                <p className={styles.navItemText}>Overview</p>
              </NavLink>
              <NavLink
                to="/wallet"
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <svg
                  width="17"
                  height="16"
                  viewBox="0 0 17 16"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.navItemImage}
                >
                  <path d="M15.5 13V13.8333C15.5 14.75 14.75 15.5 13.8333 15.5H2.16667C1.24167 15.5 0.5 14.75 0.5 13.8333V2.16667C0.5 1.25 1.24167 0.5 2.16667 0.5H13.8333C14.75 0.5 15.5 1.25 15.5 2.16667V3H8C7.075 3 6.33333 3.75 6.33333 4.66667V11.3333C6.33333 12.25 7.075 13 8 13H15.5ZM8 11.3333H16.3333V4.66667H8V11.3333ZM11.3333 9.25C10.6417 9.25 10.0833 8.69167 10.0833 8C10.0833 7.30833 10.6417 6.75 11.3333 6.75C12.025 6.75 12.5833 7.30833 12.5833 8C12.5833 8.69167 12.025 9.25 11.3333 9.25Z" />
                </svg>
                <span className={styles.navItemText}>My Wallet</span>
              </NavLink>
              <NavLink
                to="/transactions"
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.navItemImage}
                >
                  <path d="M17.6562 0.78125H2.34375C1.05133 0.78125 0 1.83258 0 3.125V16.875C0 18.1674 1.05133 19.2188 2.34375 19.2188H17.6562C18.9487 19.2188 20 18.1674 20 16.875V3.125C20 1.83258 18.9487 0.78125 17.6562 0.78125ZM2.34375 2.34375H17.6562C18.087 2.34375 18.4375 2.69424 18.4375 3.125V5.46875H1.5625V3.125C1.5625 2.69424 1.91299 2.34375 2.34375 2.34375ZM17.6562 17.6562H2.34375C1.91299 17.6562 1.5625 17.3058 1.5625 16.875V7.03125H18.4375V16.875C18.4375 17.3058 18.087 17.6562 17.6562 17.6562ZM2.73438 3.90625C2.73438 3.47473 3.08411 3.125 3.51562 3.125C3.94714 3.125 4.29688 3.47473 4.29688 3.90625C4.29688 4.33777 3.94714 4.6875 3.51562 4.6875C3.08411 4.6875 2.73438 4.33777 2.73438 3.90625ZM5.46875 3.90625C5.46875 3.47473 5.81848 3.125 6.25 3.125C6.68152 3.125 7.03125 3.47473 7.03125 3.90625C7.03125 4.33777 6.68152 4.6875 6.25 4.6875C5.81848 4.6875 5.46875 4.33777 5.46875 3.90625ZM13.5406 8.04138L16.2807 10.7812L13.5406 13.5211L12.4359 12.4164L13.2896 11.5625H9.17969V10H13.2896L12.4359 9.14612L13.5406 8.04138ZM6.71036 13.125H10.7422V14.6875H6.71036L7.56409 15.5414L6.45935 16.6461L3.71933 13.9062L6.45935 11.1664L7.56409 12.2711L6.71036 13.125Z" />
                </svg>
                <span className={styles.navItemText}>Transactions</span>
              </NavLink>
              {agentType !== "sub" && (
                <NavLink
                  to="/users"
                  className={styles.navItem}
                  activeClassName={styles.active}
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className={styles.navItemImage}
                  >
                    <path
                      d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                      stroke="#C4C4C4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                      stroke="#C4C4C4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M20 8V14"
                      stroke="#C4C4C4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M23 11H17"
                      stroke="#C4C4C4"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <p className={styles.navItemText}>Users</p>
                </NavLink>
              )}
              {/* <div
                className={
                  window.location.href.indexOf("users") === -1
                    ? styles.navItem
                    : `${styles.navItem} ${styles.active}`
                }
              >
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.navItemImage}
                >
                  <path
                    d="M16 21V19C16 17.9391 15.5786 16.9217 14.8284 16.1716C14.0783 15.4214 13.0609 15 12 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
                    stroke="#C4C4C4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M8.5 11C10.7091 11 12.5 9.20914 12.5 7C12.5 4.79086 10.7091 3 8.5 3C6.29086 3 4.5 4.79086 4.5 7C4.5 9.20914 6.29086 11 8.5 11Z"
                    stroke="#C4C4C4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 8V14"
                    stroke="#C4C4C4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M23 11H17"
                    stroke="#C4C4C4"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className={styles.navItemText}>Users</span>
                <div className={styles.linkSecondary}>
                  <NavLink
                    to="/transactions/new"
                    className={styles.linkSecondaryItem}
                  >
                    New Transaction
                  </NavLink>
                  <NavLink
                    to="/transactions/log"
                    className={styles.linkSecondaryItem}
                  >
                    Transactions Log
                  </NavLink>
                </div>
              </div> */}
              <NavLink
                to="/contact-us"
                className={styles.navItem}
                activeClassName={styles.active}
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                  className={styles.navItemImage}
                >
                  <path d="M14.6562 13.0813C14.482 12.9065 14.275 12.7678 14.0471 12.6731C13.8192 12.5785 13.5749 12.5298 13.3281 12.5298C13.0813 12.5298 12.837 12.5785 12.6091 12.6731C12.3812 12.7678 12.1742 12.9065 12 13.0813L11.0937 13.9875C10.0734 13.3399 9.12799 12.5811 8.27498 11.725C7.42069 10.8704 6.66204 9.92522 6.01248 8.90626L6.91873 8.00001C7.09353 7.82581 7.23222 7.61883 7.32686 7.39092C7.42149 7.16301 7.47021 6.91866 7.47021 6.67188C7.47021 6.42511 7.42149 6.18076 7.32686 5.95285C7.23222 5.72494 7.09353 5.51795 6.91873 5.34376L5.14998 3.58125C4.97825 3.40588 4.77301 3.26681 4.54646 3.17233C4.31991 3.07784 4.07669 3.02987 3.83123 3.03125C3.58403 3.03065 3.33915 3.07893 3.11068 3.17332C2.88222 3.26771 2.67467 3.40635 2.49998 3.58125L1.64998 4.42501C1.24484 4.86061 0.942462 5.38147 0.765083 5.9493C0.587704 6.51713 0.53983 7.11749 0.624979 7.70626C0.824979 10.05 2.36248 12.8688 4.73123 15.2438C7.09998 17.6188 9.94998 19.15 12.2937 19.375C12.4686 19.3844 12.6439 19.3844 12.8187 19.375C13.3232 19.3962 13.8269 19.3164 14.3002 19.1404C14.7735 18.9644 15.2069 18.6957 15.575 18.35L16.4187 17.5C16.5936 17.3253 16.7323 17.1178 16.8267 16.8893C16.9211 16.6608 16.9693 16.416 16.9687 16.1688C16.9701 15.9233 16.9221 15.6801 16.8277 15.4535C16.7332 15.227 16.5941 15.0217 16.4187 14.85L14.6562 13.0813ZM15.5375 16.6188L14.6875 17.4625C14.3732 17.7244 14.0063 17.9158 13.6117 18.0236C13.217 18.1315 12.8038 18.1532 12.4 18.0875C10.3687 17.9125 7.78123 16.475 5.64373 14.3375C3.50623 12.2 2.06873 9.63126 1.87498 7.60001C1.80758 7.1962 1.82855 6.78259 1.93645 6.38767C2.04435 5.99275 2.23661 5.62594 2.49998 5.31251L3.38123 4.46251C3.43963 4.40458 3.50889 4.35875 3.58504 4.32765C3.66119 4.29655 3.74273 4.28078 3.82498 4.28126C3.90723 4.28078 3.98877 4.29655 4.06492 4.32765C4.14107 4.35875 4.21033 4.40458 4.26873 4.46251L6.03748 6.25001C6.15389 6.36711 6.21922 6.52552 6.21922 6.69063C6.21922 6.85575 6.15389 7.01416 6.03748 7.13126L4.78748 8.38126C4.68967 8.47859 4.62681 8.60556 4.60872 8.74236C4.59063 8.87916 4.61833 9.0181 4.68748 9.13751C5.43585 10.4115 6.34544 11.5837 7.39373 12.625C8.43503 13.6733 9.6072 14.5829 10.8812 15.3313C11.0006 15.4004 11.1396 15.4281 11.2764 15.41C11.4132 15.3919 11.5401 15.3291 11.6375 15.2313L12.8875 13.9813C13.0046 13.8649 13.163 13.7995 13.3281 13.7995C13.4932 13.7995 13.6516 13.8649 13.7687 13.9813L15.5375 15.75C15.5954 15.8084 15.6412 15.8777 15.6723 15.9538C15.7034 16.03 15.7192 16.1115 15.7187 16.1938C15.7148 16.3534 15.65 16.5054 15.5375 16.6188ZM16.625 3.36875C15.7564 2.49686 14.7238 1.80553 13.5868 1.33462C12.4497 0.863707 11.2307 0.622534 9.99998 0.625004C9.83422 0.625004 9.67525 0.690852 9.55804 0.808062C9.44083 0.925272 9.37498 1.08424 9.37498 1.25C9.37498 1.41576 9.44083 1.57474 9.55804 1.69195C9.67525 1.80916 9.83422 1.875 9.99998 1.875C11.0728 1.87497 12.135 2.08738 13.1252 2.49999C14.1155 2.91261 15.0143 3.51724 15.7697 4.27902C16.525 5.04079 17.1221 5.94462 17.5263 6.93834C17.9306 7.93206 18.1341 8.996 18.125 10.0688C18.125 10.2345 18.1908 10.3935 18.308 10.5107C18.4252 10.6279 18.5842 10.6938 18.75 10.6938C18.9157 10.6938 19.0747 10.6279 19.1919 10.5107C19.3091 10.3935 19.375 10.2345 19.375 10.0688C19.3869 8.82497 19.1498 7.59136 18.6775 6.44067C18.2052 5.28998 17.5073 4.24548 16.625 3.36875Z" />
                  <path d="M13.0687 6.94375C13.4234 7.2963 13.704 7.71624 13.894 8.17886C14.084 8.64147 14.1795 9.13741 14.175 9.6375C14.175 9.80326 14.2408 9.96223 14.358 10.0794C14.4753 10.1967 14.6342 10.2625 14.8 10.2625C14.9657 10.2625 15.1247 10.1967 15.2419 10.0794C15.3591 9.96223 15.425 9.80326 15.425 9.6375C15.4333 8.97565 15.31 8.31874 15.0625 7.70488C14.8149 7.09102 14.4479 6.53242 13.9828 6.06149C13.5177 5.59056 12.9637 5.21666 12.3529 4.96149C11.7422 4.70632 11.0869 4.57495 10.425 4.575C10.2592 4.575 10.1003 4.64084 9.98305 4.75806C9.86584 4.87527 9.79999 5.03424 9.79999 5.2C9.79999 5.36576 9.86584 5.52473 9.98305 5.64194C10.1003 5.75915 10.2592 5.825 10.425 5.825C10.9175 5.82871 11.4045 5.92942 11.8582 6.12138C12.3118 6.31333 12.7231 6.59278 13.0687 6.94375Z" />
                </svg>

                <p className={styles.navItemText}>Support</p>
              </NavLink>
            </nav>
            {/* <div className={styles.copyright}>
          <p className={styles.copyrightTextMain}>Cicoserve payments ltd</p>
          <p className={styles.copyrightTextSub}>All rights reserved</p>
        </div> */}
          </div>
          ){/* } */}
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    agentType: state.auth.user.type,
  };
};

export default connect(mapStateToProps)(Sidebar);

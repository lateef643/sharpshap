import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import menu from "../../assets/images/dots.svg";
import arrowDown from "../../assets/icons/arrowdown.svg";
import arrowUp from "../../assets/images/arrowUp.svg";
import houseTag from "../../assets/images/houseTag.svg";
import { ThreeDots } from "svg-loaders-react";

import refresh from "../../assets/images/refresh.svg";

import styles from "./ListUsers.module.scss";

const User = ({ handleDeleteUser, loading, users }) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  // const users = [0, 1, 2, 3, 4, 5, 6, 7];

  const CustomInputGroup = ({ value, onClick, label }) => {
    return (
      <label className={styles.CustomInputGroup}>
        <span className={styles.customInputGroupLabel}>{label}:</span>
        <input type="text" value={value} onClick={onClick} />
      </label>
    );
  };

  return (
    <>
      <div className={styles.users}>
        {users.length > 0 && !loading ? (
          <div className={styles.transactions}>
            <h3 className={styles.transactionsHeading}>Users</h3>
            {/* <div className={styles.filter}>
              <div className={styles.filterToggle}>
                <span>Filter</span>
                <img
                  src={isOpen ? arrowDown : arrowUp}
                  alt=""
                  onClick={() => {
                    setIsOpen(!isOpen);
                  }}
                />
              </div>
              <div
                className={
                  isOpen ? `${styles.filters} ${styles.isOpen}` : styles.filters
                }
              >
                <label className={styles.inputGroup}>
                  <input
                    className={styles.searchUsers}
                    type="text"
                    placeholder="Search Users"
                  />
                  <span>Search Users</span>
                </label>
                <label className={styles.inputGroup}>
                  <select className={styles.filterUsers}>
                    <option value="">Type</option>
                  </select>
                </label>
                <label className={styles.inputGroup}>
                  <select className={styles.filterUsers}>
                    <option value="">Date Added</option>
                  </select>
                </label>
              </div>
            </div> */}
            <div className={styles.table}>
              <div className={styles.tableHeading}>
                <span className={styles.sn}>S/N</span>
                <span className={styles.username}>Username</span>
                <span className={styles.phone}>Phone</span>
                <span className={styles.email}>Email</span>
                <span className={styles.date}>Date Added</span>
                {/* <span className={styles.query}>Query</span> */}
                <span className={styles.action}>Action</span>
              </div>
              <div className={styles.tableBody}>
                {users.map((user, index) => {
                  const date = new Date(user.created_at).toDateString();
                  const formattedDate = date.slice(4);

                  return (
                    <div className={styles.tableRow} key={index}>
                      <span className={styles.sn}>{++index}.</span>
                      <span className={styles.username}>
                        {user.username || "Nil"}
                      </span>
                      <span className={styles.phone}>{user.phone}</span>
                      <span className={styles.email}>{user.email}</span>
                      <span className={styles.date}>{formattedDate}</span>

                      {/* <span className={styles.query}>
                    <img src={refresh} alt="" />
                  </span> */}
                      <div className={styles.action}>
                        <label htmlFor={`menu${index}`}>
                          <img className={styles.menu} src={menu} alt="" />
                        </label>
                        <input
                          name={`menu${index}`}
                          id={`menu${index}`}
                          type="checkbox"
                        />

                        <div className={styles.actions}>
                          {/* <span
                            className={`${styles.actionsItem} ${styles.actionsItemEdit}`}
                          >
                            Edit User
                          </span> */}
                          <span
                            className={styles.actionsItem}
                            onClick={() => {
                              handleDeleteUser(user.id);
                            }}
                          >
                            Deactivate User
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ) : loading ? (
          <ThreeDots fill="#3E215B" />
        ) : (
          <div style={{ fontSize: "16px" }}>No users to display</div>
        )}
      </div>
    </>
  );
};

export default User;

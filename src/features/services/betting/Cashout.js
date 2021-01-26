import React, { useState } from "react";
import { Link } from "react-router-dom";

import menu from "../../assets/images/dots.svg";
import arrowDown from "../../assets/icons/arrowdown.svg";
import arrowUp from "../../assets/images/arrowUp.svg";
import houseTag from "../../assets/images/houseTag.svg";

import refresh from "../../assets/images/refresh.svg";

import styles from "./ListUsers.module.scss";

const User = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [isOpen, setIsOpen] = useState(false);
  const users = [0, 1, 2, 3, 4, 5, 6, 7];

  const CustomInputGroup = ({ value, onClick, label }) => {
    return (
      <label className={styles.CustomInputGroup}>
        <span className={styles.customInputGroupLabel}>{label}:</span>
        <input type="text" value={value} onClick={onClick} />
      </label>
    );
  };

  return (
    <div className={styles.users}>
      <div className={styles.transactions}>
        <h3 className={styles.transactionsHeading}>Users</h3>
        <div className={styles.filter}>
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
        </div>
        <div className={styles.table}>
          <div className={styles.tableHeading}>
            <span className={styles.sn}>S/N</span>
            <span className={styles.name}>Name</span>
            <span className={styles.amount}>Transactions</span>
            <span className={styles.date}>Date Added</span>
            <span className={styles.status}>Status</span>
            {/* <span className={styles.query}>Query</span> */}
            <span className={styles.action}>Action</span>
          </div>
          <div className={styles.tableBody}>
            {users.map((user, index) => {
              return (
                <div className={styles.tableRow} key={index}>
                  <span className={styles.sn}>{++index}.</span>
                  <span className={styles.name}>Tochukwu Nwanguma</span>
                  <span className={styles.amount}>1,239</span>
                  <span className={styles.date}>
                    26<sup>th</sup>, August 2020
                  </span>
                  <span className={styles.status}>Active</span>

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
                      <Link to="/admin/transactions/976765875665">
                        Deactivate User
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;

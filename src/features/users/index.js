import React, { useEffect, useState } from "react";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./index.module.scss";
import { setCurrentPage } from "../../actions/page";
import { setDisplayModal } from "../../actions/modal";

import pin from "../../assets/icons/pin.svg";
import lock from "../../assets/icons/lock.svg";

import userGroup from "../../assets/icons/users.svg";
import user from "../../assets/icons/bio-user.svg";

import ListUsers from "./ListUsers";

import transfer from "../../assets/images/transfer.svg";

export const Users = ({ changeCurrentPage, displayModal }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get()
  //   .then((res) => {
  //     const logs = res.data.data.data;
  //     setLogs(logs);
  //     setLoading(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }, [])

  useEffect(() => {
    changeCurrentPage({
      heading: "List Users",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>User management</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "addUsers",
                  service: "",
                });
              }}
            >
              <img className={styles.serviceLogo} src={userGroup} alt="" />
              <p className={styles.serviceText}>Add User</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "addUsers",
                  service: "",
                });
              }}
            >
              <img className={styles.serviceLogo} src={user} alt="" />
              <p className={styles.serviceText}>Edit User</p>
            </div>
          </div>
        </div>
      </div>
      <ListUsers />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Users);

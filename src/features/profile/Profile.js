import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { UPDATE_USER_PASSWORD, UPDATE_USER } from "../../utils/constants";
import { setCurrentPage } from "../../actions/page";
import styles from "./Profile.module.scss";
import { startLogout } from "../../actions/auth";

import { setDisplayModal } from "../../actions/modal";
import pin from "../../assets/icons/pin.svg";
import lock from "../../assets/icons/lock.svg";

export const Profile = ({ agentData, changeCurrentPage, displayModal }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState(false);

  // useEffect(() => {}, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Profile",
      search: true,
    });
  }, []);

  const handleOnSubmit = () => {
    console.log(formState);
  };

  const handleOnChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Profile</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "password",
                  service: "password",
                });
              }}
            >
              <img className={styles.serviceLogo} src={pin} alt="" />
              <p className={styles.serviceText}>Password</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  // modal: "pin",
                  service: "pin",
                });
              }}
            >
              <img className={styles.serviceLogo} src={lock} alt="" />
              <p className={styles.serviceText}>Change Pin</p>
            </div>
          </div>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">First Name</label>
          <input
            type="text"
            name="first_name"
            onChange={handleOnChange}
            value={formState.first_name}
          />
          {errors && !formState.first_name && (
            <p className={styles.errorText}>Please Enter First Name</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="last_name">Last Name</label>
          <input
            type="text"
            name="last_name"
            onChange={handleOnChange}
            value={formState.last_name}
          />
          {errors && !formState.last_name && (
            <p className={styles.errorText}>Please Enter Last Name</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
            type="date"
            name="date_of_birth"
            onChange={handleOnChange}
            value={formState.date_of_birth}
          />
          {errors && !formState.date_of_birth && (
            <p className={styles.errorText}>Please Select Date of Birth</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            type="text"
            name="email"
            onChange={handleOnChange}
            value={formState.email}
          />
          {errors && !formState.email && (
            <p className={styles.errorText}>Please Enter Email</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="gender">Gender</label>
          <select
            type="text"
            name="gender"
            onChange={handleOnChange}
            value={formState.gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors && !formState.gender && (
            <p className={styles.errorText}>Please Select Gender</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="business_phone">Phone</label>
          <input
            type="text"
            name="business_phone"
            onChange={handleOnChange}
            value={formState.business_phone}
          />
          {errors && !formState.business_phone && (
            <p className={styles.errorText}>Please Enter Phone Number</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="mobile">Mobile</label>
          <input
            type="text"
            name="mobile"
            onChange={handleOnChange}
            value={formState.mobile}
          />
          {errors && !formState.mobile && (
            <p className={styles.errorText}>Please Enter Mobile Number</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="bvn">BVN</label>
          <input
            type="text"
            name="bvn"
            onChange={handleOnChange}
            value={formState.bvn}
          />
          {errors && !formState.bvn && (
            <p className={styles.errorText}>Please Enter BVN</p>
          )}
        </div>
        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    agentData: {
      first_name: state.auth.user.first_name,
      last_name: state.auth.userlast_name,
      business_name: state.auth.user.business_name,
      email: state.auth.user.email,
      phone: state.auth.user.business_phone,
      address: state.auth.user.business_address,
    },
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    startLogout: () => dispatch(startLogout()),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

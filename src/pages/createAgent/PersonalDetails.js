import React, { useState } from "react";

import styles from "./PersonalDetails.module.scss";

const PersonalDetails = ({ setStatus, agentData, dispatch }) => {
  const [errors, setErrors] = useState(false);

  const handleOnChange = ({ target }) => {
    setErrors(false);

    dispatch({
      type: "SET_AGENT_DATA",
      payload: { [target.name]: target.value },
    });
  };

  const handleProceed = (e) => {
    e.preventDefault();

    const hasNoErrors =
      agentData.first_name &&
      agentData.last_name &&
      agentData.date_of_birth &&
      agentData.email &&
      agentData.gender &&
      agentData.business_phone &&
      agentData.bvn;

    if (hasNoErrors) {
      setStatus("business");
    } else {
      setErrors(true);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleProceed}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="firstname">
            First Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="first_name"
            onChange={handleOnChange}
            value={agentData.first_name}
          />
          {errors && !agentData.first_name && (
            <p className={styles.errorText}>Please Enter First Name</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="last_name">
            Last Name
          </label>
          <input
            className={styles.input}
            type="text"
            name="last_name"
            onChange={handleOnChange}
            value={agentData.last_name}
          />
          {errors && !agentData.last_name && (
            <p className={styles.errorText}>Please Enter Last Name</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="date_of_birth">
            Date of Birth
          </label>
          <input
            className={styles.input}
            type="date"
            name="date_of_birth"
            onChange={handleOnChange}
            value={agentData.date_of_birth}
          />
          {errors && !agentData.date_of_birth && (
            <p className={styles.errorText}>Please Select Date of Birth</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            className={styles.input}
            type="text"
            name="email"
            onChange={handleOnChange}
            value={agentData.email}
          />
          {errors && !agentData.email && (
            <p className={styles.errorText}>Please Enter Email</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="gender">
            Gender
          </label>
          <select
            className={styles.input}
            type="text"
            name="gender"
            onChange={handleOnChange}
            value={agentData.gender}
          >
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          {errors && !agentData.gender && (
            <p className={styles.errorText}>Please Select Gender</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="business_phone">
            Phone
          </label>
          <input
            className={styles.input}
            type="text"
            name="business_phone"
            onChange={handleOnChange}
            value={agentData.business_phone}
          />
          {errors && !agentData.business_phone && (
            <p className={styles.errorText}>Please Enter Phone Number</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="mobile">
            Mobile
          </label>
          <input
            className={styles.input}
            type="text"
            name="mobile"
            onChange={handleOnChange}
            value={agentData.mobile}
          />
          {errors && !agentData.mobile && (
            <p className={styles.errorText}>Please Enter Mobile Number</p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="bvn">
            BVN
          </label>
          <input
            className={styles.input}
            type="text"
            name="bvn"
            onChange={handleOnChange}
            value={agentData.bvn}
          />
          {errors && !agentData.bvn && (
            <p className={styles.errorText}>Please Enter BVN</p>
          )}
        </div>
        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button className={styles.button} type="submit">
            Next
          </button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;

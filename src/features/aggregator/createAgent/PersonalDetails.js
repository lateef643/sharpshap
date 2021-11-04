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
      agentData.identity_type;

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
          <label htmlFor="firstname">First Name</label>
          <input
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
          <label htmlFor="last_name">Last Name</label>
          <input
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
          <label htmlFor="date_of_birth">Date of Birth</label>
          <input
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
          <label htmlFor="email">Email</label>
          <input
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
          <label htmlFor="gender">Gender</label>
          <select
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
          <label htmlFor="business_phone">Phone</label>
          <input
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
          <label htmlFor="mobile">Mobile</label>
          <input
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
          <label htmlFor="identity_type">ID Type</label>
          <select
            type="text"
            name="identity_type"
            onChange={handleOnChange}
            value={agentData.identity_type}
          >
            <option value="">Select type</option>
            <option value="Driver's License">Driver's License</option>
            <option value="Voter's Card">Voter's Card</option>
            <option value="National Identity Card">
              National Identity Card
            </option>
            <option value="passport">Passport</option>
          </select>
          {errors && !agentData.mobile && (
            <p className={styles.errorText}>Please Select ID type</p>
          )}
        </div>
        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default PersonalDetails;

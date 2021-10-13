import React, { useState } from "react";

import validateFormData from "../../validation/validateFormData";

import styles from "./PersonalDetails.module.scss";

const PersonalDetails = ({ setStatus, agentData, dispatch }) => {
  const [validationErrors, setValidationErrors] = useState({ errors: true });

  const handleOnChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: "" });

    dispatch({
      type: "SET_AGENT_DATA",
      payload: { [target.name]: target.value },
    });
  };

  const handleProceed = (e) => {
    e.preventDefault();

    const {
      first_name,
      last_name,
      date_of_birth,
      email,
      mobile,
      gender,
      business_phone,
     
      bvn
    } = agentData;

    const state = {
      first_name,
      last_name,
      date_of_birth,
      email,
      mobile,
      gender,
      business_phone,
     
      bvn
    };

    const keys = Object.keys(state);
    const errors = validateFormData(agentData, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setStatus("business");
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
          {validationErrors.first_name && (
            <p className={styles.errorText}>
              {validationErrors.first_name.text}
            </p>
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
          {validationErrors.last_name && (
            <p className={styles.errorText}>
              {validationErrors.last_name.text}
            </p>
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
          {validationErrors.date_of_birth && (
            <p className={styles.errorText}>
              {validationErrors.date_of_birth.text}
            </p>
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
          {validationErrors.email && (
            <p className={styles.errorText}>{validationErrors.email.text}</p>
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
          {validationErrors.gender && (
            <p className={styles.errorText}>{validationErrors.gender.text}</p>
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
          {validationErrors.business_phone && (
            <p className={styles.errorText}>
              {validationErrors.business_phone.text}
            </p>
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
          {validationErrors.mobile && (
            <p className={styles.errorText}>{validationErrors.mobile.text}</p>
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
          {validationErrors.bvn && (
            <p className={styles.errorText}>{validationErrors.bvn.text}</p>
          )}
        </div>
        {/* <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="ReferralCode">
            ReferallCode
          </label>
          <input
            className={styles.input}
            type="text"
            name="ReferralCode"
            onChange={handleOnChange}
            value={agentData.Referal_code}
          />
         
        </div> */}
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

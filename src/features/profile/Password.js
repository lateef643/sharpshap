import React, { useState } from "react";
import PropTypes from "prop-types";

import validateFormData from "../../../validation/validateFormData";

import styles from "./Password.module.scss";

export const BuyAirtimeForm = (props) => {
  const {
    AirtimePurchaseFormState: state,
    dispatch,
    setComponentToRender,
  } = props;
  const [validationErrors, setValidationErrors] = useState({});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const keys = Object.keys(state);
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleSetFormState = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });

    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <form
      className={styles.form}
      onSubmit={(e) => handleOnSubmit(e)}
      autoComplete="off"
    >
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="old_password">
          Password
        </label>

        <input
          name="phone"
          value={state.phone}
          type="text"
          onChange={(e) => handleSetFormState(e)}
          className={
            validationErrors.phone
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.phone && (
          <p className={styles.validationErrorText}>
            Please enter valid phone number
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <div className={styles.formGroupSub}>
          <select
            name="currency"
            onChange={(e) => handleSetFormState(e)}
            className={
              validationErrors.amount
                ? `${styles.outlineRed} ${styles.select} ${styles.selectCurrency}`
                : `${styles.outlineGrey} ${styles.select} ${styles.selectCurrency}`
            }
          >
            <option value="">NGN</option>
          </select>
          <input
            name="amount"
            value={state.amount}
            type="number"
            onChange={(e) => handleSetFormState(e)}
            className={
              validationErrors.amount
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
          />
        </div>
        {validationErrors.amount && (
          <p className={styles.validationErrorText}>
            Please enter valid amount
          </p>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
    </form>
  );
};

BuyAirtimeForm.propTypes = {
  networkList: PropTypes.array.isRequired,
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default BuyAirtimeForm;

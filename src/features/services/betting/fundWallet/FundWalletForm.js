import React, { useState } from "react";

import validateFormData from "../../../../validation/validateFormData";

import styles from "./FundWalletForm.module.scss";

export const FundWalletForm = (props) => {
  const { setComponentToRender, dispatch, FundWalletFormState: state } = props;
  const [errors, setErrors] = useState({});

  const handleStateChange = ({ target }) => {
    delete errors[target.name];

    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  const handleOnContinue = (e) => {
    e.preventDefault();

    const { accountId, amount } = state;

    const validationState = {
      accountId,
      amount,
    };

    const properties = Object.keys(validationState);
    const errors = validateFormData(state, properties);

    setErrors(errors);

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  return (
    <form
      className={styles.form}
      onSubmit={handleOnContinue}
      autoComplete="off"
    >
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="accountId">
          Cloudbet Account ID
        </label>
        <input
          name="accountId"
          value={state.accountId}
          type="text"
          onChange={handleStateChange}
          placeholder="e.g 08012345678"
          className={
            errors.accountId
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {errors.accountId && (
          <p className={styles.validationErrorText}>Account ID is required</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <input
          name="amount"
          value={state.amount}
          type="number"
          onChange={handleStateChange}
          className={
            errors.amount
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {errors.amount && (
          <p className={styles.validationErrorText}>Amount is required</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="phone">
          Customer Number
        </label>
        <input
          name="phone"
          type="text"
          value={state.phone}
          onChange={handleStateChange}
          placeholder="e.g 08012345678"
          className={
            errors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {errors.phone && (
          <p className={styles.validationErrorText}>
            Please enter phone number
          </p>
        )}
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={!state.accountId || !state.amount || !state.phone}
      >
        Continue
      </button>
    </form>
  );
};

export default FundWalletForm;

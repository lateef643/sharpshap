import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { VERIFY_ACCOUNT } from "../../../store/api/constants";
import generateBankImageUrl from "./generateBankImageUrl";
import validateFormData from "../../../validation/validateFormData";
import banksList from "../../../store/localData/listOfBanks";
import VerificationLoader from "../../../components/util/VerificationLoader";

import styles from "./FundsTransferForm.module.scss";

export const FundsTransferForm = (props) => {
  const {
    FundsTransferFormState: state,
    dispatch,
    setComponentToRender,
    transactionCost,
  } = props;
  const [accountValidationLoading, setAccountValidationLoading] = useState(
    false
  );
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    const { accountNumber, beneficiaryBankCode } = state;

    const payload = {
      account_number: accountNumber,
      bank: beneficiaryBankCode,
    };

    if (accountNumber.length >= 10) {
      setValidationErrors({ ...validationErrors, accountName: "" });
      setAccountValidationLoading(true);

      (async function verifyAccount() {
        try {
          const res = await axios.post(VERIFY_ACCOUNT, payload);

          const accountName = res.data.data.Data.name;

          if (accountName == "ERROR") throw new Error();

          dispatch({
            type: "UPDATE_FORM_STATE",
            payload: { accountName },
          });
          setValidationErrors({ ...validationErrors, accountName: false });
          setAccountValidationLoading(false);
        } catch (e) {
          dispatch({
            type: "UPDATE_FORM_STATE",
            payload: { accountName: "" },
          });
          setValidationErrors({ ...validationErrors, accountName: true });
          setAccountValidationLoading(false);
        }
      })();
    } else {
      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { accountName: "" },
      });
    }
  }, [state.accountNumber]);

  //update total on amount change
  useEffect(() => {
    if (!isNaN(parseInt(state.amount))) {
      const total = parseInt(state.amount) + transactionCost;

      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { total },
      });
    }
  }, [state.amount]);

  //update bank name on bank code change
  useEffect(() => {
    if (state.beneficiaryBankCode) {
      const selectedBank = banksList.find((bank) => {
        return bank.code == state.beneficiaryBankCode;
      });

      const bankName = selectedBank.name;

      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { beneficiaryBankName: bankName },
      });
    }
  }, [state.beneficiaryBankCode]);

  const handleOnContinue = (e) => {
    e.preventDefault();

    const keys = Object.keys(state);
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    //want account validation error to only show on failed validation
    delete errors.accountName;

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleFormStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  //Dynamically render bank logo
  let bankImageUrl = generateBankImageUrl(state.beneficiaryBankCode);

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleOnContinue}
    >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={bankImageUrl} />
      </div>
      <label>
        <span>Beneficiary Bank</span>
        <select
          name="beneficiaryBankCode"
          onChange={handleFormStateChange}
          className={
            validationErrors.beneficiaryBankCode
              ? styles.outlineRed
              : styles.outlineGrey
          }
        >
          <option value="">Select Bank</option>
          {banksList.map((bank, index) => {
            return (
              <option value={bank.code} key={`${index}--${bank.name}`}>
                {bank.name}
              </option>
            );
          })}
        </select>
        {validationErrors.beneficiaryBankCode ? (
          <p className={styles.validationErrorText}>Please select bank</p>
        ) : undefined}
      </label>
      <label>
        <span>Amount</span>
        <input
          name="amount"
          value={state.amount}
          type="number"
          onChange={handleFormStateChange}
          className={
            validationErrors.amount ? styles.outlineRed : styles.outlineGrey
          }
        />
        {validationErrors.amount ? (
          <p className={styles.validationErrorText}>
            Please enter valid amount
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Account Number</span>
        <input
          name="accountNumber"
          value={state.accountNumber}
          type="text"
          onChange={handleFormStateChange}
          className={
            validationErrors.accountNumber
              ? styles.outlineRed
              : styles.outlineGrey
          }
        />
        {validationErrors.accountNumber ? (
          <p className={styles.validationErrorText}>
            Please enter account number
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Account Name</span>
        <input
          name="accountName"
          type="text"
          value={state.accountName}
          disabled={true}
          className={styles.outlineGrey}
        />
        {accountValidationLoading ? (
          <div className={styles.loader}>
            <VerificationLoader />
          </div>
        ) : undefined}
        {validationErrors.accountName ? (
          <p className={styles.validationErrorText}>
            Account verification failed please check account number and try
            again
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Customer Number</span>
        <input
          name="phone"
          type="text"
          value={state.phone}
          onChange={handleFormStateChange}
          className={
            validationErrors.phone ? styles.outlineRed : styles.outlineGrey
          }
        />
        {validationErrors.phone ? (
          <p className={styles.validationErrorText}>
            Please enter phone number
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Narration</span>
        <input
          name="narration"
          type="text"
          value={state.narration}
          onChange={handleFormStateChange}
          className={
            validationErrors.narration ? styles.outlineRed : styles.outlineGrey
          }
        />
        {validationErrors.narration ? (
          <p className={styles.validationErrorText}>Narration is required</p>
        ) : undefined}
      </label>
      {state.beneficiaryBankCode &&
      state.beneficiaryBankName &&
      state.amount &&
      state.accountNumber &&
      state.accountName &&
      state.phone &&
      state.narration &&
      state.total ? (
        <button type="submit">Continue</button>
      ) : undefined}
    </form>
  );
};

FundsTransferForm.propTypes = {
  FundsTransferFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default FundsTransferForm;

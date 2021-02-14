import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";

import { VERIFY_ACCOUNT } from "../../../utils/constants";
import generateBankImageUrl from "./generateBankImageUrl";
import validateFormData from "../../../validation/validateFormData";
import banksList from "../../../utils/listOfBanks";

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
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <div className={styles.formGroupSub}>
          <select
            name="currency"
            onChange={handleFormStateChange}
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
            onChange={handleFormStateChange}
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
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="beneficiaryBankCode">
          Beneficiary bank
        </label>
        <div className={styles.formGroupSub}>
          <img className={styles.selectionImage} src={bankImageUrl} alt="" />
          <select
            name="beneficiaryBankCode"
            onChange={handleFormStateChange}
            className={
              validationErrors.beneficiaryBankCode
                ? `${styles.outlineRed} ${styles.select}`
                : `${styles.outlineGrey} ${styles.select}`
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
        </div>
        {validationErrors.beneficiaryBankCode && (
          <p className={styles.validationErrorText}>Please select bank</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="accountNumber">
          Account Number
        </label>
        <input
          name="accountNumber"
          placeholder="Beneficiary's account number"
          value={state.accountNumber}
          type="text"
          onChange={handleFormStateChange}
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.accountNumber && (
          <p className={styles.validationErrorText}>
            Please enter account number
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="accountName">
          Account Name
        </label>
        <input
          name="accountName"
          type="text"
          value={state.accountName}
          disabled={true}
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {accountValidationLoading && (
          <div className={styles.loader}>
            <ThreeDots />
          </div>
        )}
        {validationErrors.accountName && (
          <p className={styles.validationErrorText}>
            Account verification failed please check account number and try
            again
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="phone">
          Phone Number
        </label>
        <input
          name="phone"
          type="text"
          value={state.phone}
          onChange={handleFormStateChange}
          placeholder="Customer's phone number"
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.phone && (
          <p className={styles.validationErrorText}>
            Please enter phone number
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="narration">
          Narration
        </label>
        <input
          name="narration"
          type="text"
          value={state.narration}
          placeholder="Remark (e.g Transfer funds to ABC)"
          onChange={handleFormStateChange}
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.narration && (
          <p className={styles.validationErrorText}>Narration is required</p>
        )}
      </div>
      <button
        type="submit"
        className={styles.button}
        disabled={
          !state.beneficiaryBankCode ||
          !state.beneficiaryBankName ||
          !state.amount ||
          !state.accountNumber ||
          !state.accountName ||
          !state.phone ||
          !state.narration ||
          !state.total
        }
      >
        Continue
      </button>
    </form>
  );
};

FundsTransferForm.propTypes = {
  FundsTransferFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default FundsTransferForm;

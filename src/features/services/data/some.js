import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { connect } from "react-redux";

import generateNetworkImageUrl from "./generateNetworkImageUrl";
import { GET_DATA_PLANS } from "../../../store/api/constants";
import validateFormData from "../../../validation/validateFormData";

import styles from "./BuyDataForm.module.scss";

export const BuyDataForm = (props) => {
  const {
    DataPurchaseFormState: state,
    dispatch,
    setComponentToRender,
    service,
  } = props;
  const [validationErrors, setValidationErrors] = useState({});
  const [dataPlans, setDataPlans] = useState([]);

  const networkImageUrl = generateNetworkImageUrl(service);

  useEffect(() => {
    const telcoList = {
      airtel: "Airtel",
      "9mobile": "9mobile",
      glo: "Globacom",
      mtn: "MTN",
    };

    const telcoName = telcoList[`${service}`];

    axios
      .get(GET_DATA_PLANS)
      .then((res) => {
        const data = res.data.data;

        const dataPlans = data.filter((data) => {
          return data.operator === telcoName;
        });

        setDataPlans(dataPlans);
      })
      .catch((err) => {
        // console.log(err);
      });
  }, [service]);

  useEffect(() => {
    const selectedPlan = dataPlans.filter((plan) => {
      return plan.productId === state.plan;
    });

    const amount = selectedPlan.face_value;

    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { amount },
    });
  }, [state.plan]);

  const handleOnContinue = (e) => {
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
      onSubmit={(e) => handleOnContinue(e)}
      autoComplete="off"
    >
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount">
          Phone number
        </label>
        <div className={styles.formGroupSub}>
          <select
            name="currency"
            onChange={(e) => handleSetFormState(e)}
            className={
              validationErrors.phone
                ? `${styles.outlineRed} ${styles.select} ${styles.selectCurrency}`
                : `${styles.outlineGrey} ${styles.select} ${styles.selectCurrency}`
            }
          >
            <option value="">+234</option>
          </select>
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
        </div>
        {validationErrors.phone && (
          <p className={styles.validationErrorText}>
            Please enter valid phone number
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="plan">
          Phone number
        </label>
        <div className={styles.formGroupSub}>
          <img className={styles.selectionImage} src={networkImageUrl} alt="" />
          <select
            name="plan"
            onChange={(e) => handleSetFormState(e)}
            className={
              validationErrors.plan
                ? `${styles.outlineRed} ${styles.select}`
                : `${styles.outlineGrey} ${styles.select}`
            }
          >
            <option value="">Select Plan</option>
            {dataPlans.map((plan, index) => {
              return (
                <option value={plan.productId} key={`${index}--${plan.name}`}>
                  {plan.product_value}
                </option>
              );
            })}
          </select>
        </div>
        {validationErrors.plan && (
          <p className={styles.validationErrorText}>Please select plan</p>
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

BuyDataForm.propTypes = {
  networkList: PropTypes.array.isRequired,
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(BuyDataForm);

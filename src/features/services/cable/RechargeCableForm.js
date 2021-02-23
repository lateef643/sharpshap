import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import validateFormData from "../../../validation/validateFormData";
import {
  GET_STARTIMES_PLANS,
  GET_DSTV_PLANS,
  GET_GOTV_PLANS,
  VALIDATE_STARTIMES_CUSTOMER,
  VALIDATE_MULTICHOICE_CUSTOMER,
} from "../../../store/api/constants";
import VerificationLoader from "../../../components/util/VerificationLoader";
import dstv from "../../../assets/images/dstv.jpg";
import startimes from "../../../assets/images/startimes.png";
import gotv from "../../../assets/images/GOtv_Logo.png";

import styles from "./RechargeCableForm.module.scss";

export const RechargeCableForm = (props) => {
  const {
    RechargeCableFormState: state,
    dispatch,
    setComponentToRender,
  } = props;
  const [customerValidationLoading, setCustomerValidationLoading] = useState(
    false
  );
  const [fetchPlansLoading, setFetchPlansLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const cableTvProviders = [
    { name: "dstv" },
    { name: "gotv" },
    { name: "startimes" },
  ];
  const [plans, setPlans] = useState([]);
  const [durations, setDurations] = useState({
    type: "multichoice",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  });

  //effect fetches plans based on selected provider
  useEffect(() => {
    const { provider } = state;
    let providerApi;

    if (provider) {
      setFetchPlansLoading(true);

      switch (provider) {
        case "dstv":
          providerApi = GET_DSTV_PLANS;
          break;
        case "gotv":
          providerApi = GET_GOTV_PLANS;
          break;
        case "startimes":
          providerApi = GET_STARTIMES_PLANS;
          break;
        default:
          providerApi = undefined;
      }

      (async function fetchPlans() {
        try {
          const res = await axios.get(providerApi);
          const plans = res.data.data;

          setPlans(plans);
          setFetchPlansLoading(false);
        } catch (e) {
          setFetchPlansLoading(false);
        }
      })();
    }
  }, [state.provider]);

  //sets selected plan name && plan amount based on plans dropdown value
  useEffect(() => {
    if (state.selectedPlanCode) {
      const selectedPlan = plans.find((plan) => {
        return plan.product_code || plan.name === state.selectedPlanCode;
      });

      const selectedPlanName = selectedPlan.name;
      const selectedPlanAmount =
        selectedPlan.amount || selectedPlan.cycles.monthly;

      if (selectedPlan.cycles) {
        let data = [];

        for (let key in selectedPlan.cycles) {
          if (selectedPlan.cycles.hasOwnProperty(key)) {
            data.push({
              type: [key],
              value: selectedPlan.cycles[key],
            });
          }
        }

        setDurations({
          type: startimes,
          data,
        });
      }
      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { selectedPlanName, selectedPlanAmount },
      });
    }
  }, [state.selectedPlanCode]);

  //Account number validation
  useEffect(() => {
    let providerApi;
    const { provider, smartCardNumber } = state;

    if (provider && smartCardNumber.length >= 10) {
      setCustomerValidationLoading(true);

      if (provider === "dstv" || provider === "gotv") {
        providerApi = VALIDATE_MULTICHOICE_CUSTOMER;
      } else if (provider === "startimes") {
        providerApi = VALIDATE_STARTIMES_CUSTOMER;
      }

      const payload = {
        smartcard: smartCardNumber,
        service: provider,
      };

      (async function validateAndSetCustomerName() {
        try {
          const res = await axios.post(providerApi, payload);

          let name;

          name =
            provider === "startimes" ? res.data.data.name : res.data.data.name;

          setValidationErrors({ ...validationErrors, customerName: !name });
          dispatch({
            type: "UPDATE_FORM_STATE",
            payload: { customerName: name },
          });
          setCustomerValidationLoading(false);
        } catch (e) {
          setValidationErrors({
            ...validationErrors,
            customerName: !validationErrors.customerName,
          });
          setCustomerValidationLoading(false);
        }
      })();
    }
  }, [state.provider, state.smartCardNumber]);

  //calculates and sets payable amount based on selectedPlanAmount and plan duration
  useEffect(() => {
    const { provider } = state;

    if (provider === "dstv" || provider === "gotv") {
      const { selectedPlanDuration, selectedPlanAmount } = state;
      let amount;

      if (selectedPlanDuration && selectedPlanAmount) {
        amount = selectedPlanDuration * selectedPlanAmount;

        dispatch({
          type: "UPDATE_FORM_STATE",
          payload: { amount },
        });
      }
    } else if (provider === "startimes") {
      const { selectedPlanDuration } = state;

      const amount = selectedPlanDuration;

      dispatch({
        type: "UPDATE_FORM_STATE",
        payload: { amount },
      });
    }
  }, [state.selectedPlanDuration]);

  const handleFormStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  const handleOnContinue = (e) => {
    e.preventDefault();

    const keys = Object.keys(state);
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    //restricting customer name error to failed validation
    delete errors.customerName;

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  //Dynamically render bank logo
  let providerImageUrl = "";

  switch (state.provider) {
    case "gotv":
      providerImageUrl = gotv;
      break;
    case "startimes":
      providerImageUrl = startimes;
      break;
    default:
      providerImageUrl = dstv;
  }

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleOnContinue}
    >
      <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={providerImageUrl}
          alt="cable provider icon"
        />
      </div>
      <label>
        <span>Provider</span>
        <select
          name="provider"
          onChange={handleFormStateChange}
          className={
            validationErrors.provider ? styles.outlineRed : styles.outlineGrey
          }
        >
          <option value="">Select Provider</option>
          {cableTvProviders.map((cable, index) => {
            return (
              <option value={cable.name} key={`${index}--${cable.name}`}>
                {cable.name}
              </option>
            );
          })}
        </select>
        {validationErrors.provider ? (
          <p className={styles.validationErrorText}>Please select provider</p>
        ) : undefined}
      </label>
      <label>
        <span>Packages</span>
        <select
          name="selectedPlanCode"
          onChange={handleFormStateChange}
          className={
            validationErrors.plan ? styles.outlineRed : styles.outlineGrey
          }
        >
          <option value="">Select Plan</option>
          {plans.map((plan, index) => {
            return (
              <option
                value={plan.product_code || plan.name}
                key={`${index}--${plan.name}`}
              >
                {plan.name}
              </option>
            );
          })}
        </select>
        {fetchPlansLoading ? (
          <div className={styles.loader}>
            <VerificationLoader />
          </div>
        ) : undefined}
        {validationErrors.plan ? (
          <p className={styles.validationErrorText}>Please select plan</p>
        ) : undefined}
      </label>
      <label>
        <span>Smart Card Number</span>
        <input
          name="smartCardNumber"
          value={state.smartCardNumber}
          type="text"
          onChange={handleFormStateChange}
          className={
            validationErrors.smartCardNumber
              ? styles.outlineRed
              : styles.outlineGrey
          }
        />
        {validationErrors.smartCardNumber ? (
          <p className={styles.validationErrorText}>
            Please enter smart card number
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Customer Name</span>
        <input
          name="customerName"
          type="text"
          value={state.customerName}
          disabled={true}
          className={styles.outlineGrey}
        />
        {customerValidationLoading ? (
          <div className={styles.loader}>
            <VerificationLoader />
          </div>
        ) : undefined}
        {validationErrors.customerName ? (
          <p className={styles.validationErrorText}>
            Customer validation failed
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Phone Number</span>
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
        <span>Plan Duration</span>
        <select
          name="selectedPlanDuration"
          onChange={handleFormStateChange}
          className={
            validationErrors.planDuration
              ? styles.outlineRed
              : styles.outlineGrey
          }
        >
          <option value="">Select Duration</option>
          {durations.type === "multichoice"
            ? durations.data.map((duration) => {
                return <option value={duration}>{duration} months</option>;
              })
            : durations.data.map((duration) => {
                return <option value={duration.value}>{duration.type}</option>;
              })}
        </select>
        {validationErrors.planDuration ? (
          <p className={styles.validationErrorText}>
            Please select plan duration
          </p>
        ) : undefined}
      </label>
      <label>
        <span>Amount</span>
        <input
          name="amount"
          type="text"
          value={state.amount}
          onChange={handleFormStateChange}
          className={
            validationErrors.amount ? styles.outlineRed : styles.outlineGrey
          }
        />
        {validationErrors.amount ? (
          <p className={styles.validationErrorText}>Please enter amount</p>
        ) : undefined}
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

RechargeCableForm.propTypes = {
  RechargeCableFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default RechargeCableForm;

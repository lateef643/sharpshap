import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import validateFormData from "../../../validation/validateFormData";
import {
  GET_STARTIMES_PLANS,
  GET_DSTV_PLANS,
  GET_GOTV_PLANS,
  VALIDATE_STARTIMES_CUSTOMER,
  VALIDATE_MULTICHOICE_CUSTOMER,
} from "../../../utils/constants";

import styles from "./RechargeCableForm.module.scss";

export const RechargeCableForm = (props) => {
  const {
    RechargeCableFormState: state,
    setFormState,
    setComponentToRender,
  } = props;
  const [customerValidationLoading, setCustomerValidationLoading] = useState(
    false
  );
  const [fetchPlansLoading, setFetchPlansLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});
  const [plans, setPlans] = useState([]);
  const [durations, setDurations] = useState({
    type: "multichoice",
    data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
  });

  //effect fetches plans based on selected provider
  useEffect(() => {
    const provider = props.service;

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
  }, [props.service]);

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
          type: "startimes",
          data,
        });
      }
      setFormState({
        type: "UPDATE_FORM_STATE",
        payload: { selectedPlanName, selectedPlanAmount },
      });
    }
  }, [state.selectedPlanCode]);

  //Account number validation
  useEffect(() => {
    let providerApi;
    const { smartCardNumber } = state;

    if (smartCardNumber.length >= 10) {
      setCustomerValidationLoading(true);

      if (props.service === "dstv" || props.service === "gotv") {
        providerApi = VALIDATE_MULTICHOICE_CUSTOMER;
      } else if (props.service === "startimes") {
        providerApi = VALIDATE_STARTIMES_CUSTOMER;
      }

      const payload = {
        smartcard: smartCardNumber,
        service: props.service,
      };

      (async function validateAndSetCustomerName() {
        try {
          const res = await axios.post(providerApi, payload);

          let name;

          name =
            props.service === "startimes"
              ? res.data.data.name
              : res.data.data.name;

          setValidationErrors({ ...validationErrors, customerName: !name });
          setFormState({
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
    if (props.service === "dstv" || props.service === "gotv") {
      const { selectedPlanDuration, selectedPlanAmount } = state;
      let amount;

      if (selectedPlanDuration && selectedPlanAmount) {
        amount = selectedPlanDuration * selectedPlanAmount;

        setFormState({
          type: "UPDATE_FORM_STATE",
          payload: { amount },
        });
      }
    } else if (props.service === "startimes") {
      const { selectedPlanDuration } = state;

      const amount = selectedPlanDuration;

      setFormState({
        type: "UPDATE_FORM_STATE",
        payload: { amount },
      });
    }
  }, [state.selectedPlanDuration]);

  const handleFormStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    setFormState({
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
  let providerImageUrl = generateServiceProviderImageUrl(props.service);

  return (
    <form
      className={styles.form}
      autoComplete="off"
      onSubmit={handleOnContinue}
    >
      {/* <div className={styles.imageContainer}>
        <img
          className={styles.image}
          src={providerImageUrl}
          alt="cable provider icon"
        />
      </div> */}
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="selectedPlanCode">
          Packages
        </label>
        <select
          name="selectedPlanCode"
          onChange={handleFormStateChange}
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.select}`
              : `${styles.outlineGrey} ${styles.select}`
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
        {fetchPlansLoading && (
          <div className={styles.loader}>
            <ThreeDots />
          </div>
        )}
        {validationErrors.plan && (
          <p className={styles.validationErrorText}>Please select plan</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="smartCardNumber" className={styles.label}>
          Smart Card Number
        </label>
        <input
          name="smartCardNumber"
          value={state.smartCardNumber}
          type="text"
          onChange={handleFormStateChange}
          className={
            validationErrors.amount
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.smartCardNumber && (
          <p className={styles.validationErrorText}>
            Please enter smart card number
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="customerName" className={styles.label}>
          Customer Name
        </label>
        <input
          name="customerName"
          type="text"
          value={state.customerName}
          disabled={true}
          className={
            validationErrors.amount
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {customerValidationLoading && (
          <div className={styles.loader}>
            <ThreeDots />
          </div>
        )}
        {validationErrors.customerName && (
          <p className={styles.validationErrorText}>
            Customer validation failed
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="phone" className={styles.label}>
          Phone Number
        </label>
        <input
          name="phone"
          type="text"
          value={state.phone}
          onChange={handleFormStateChange}
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
        <label htmlFor="selectedPlanDuration" className={styles.label}>
          Plan Duration
        </label>
        <select
          name="selectedPlanDuration"
          onChange={handleFormStateChange}
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.select}`
              : `${styles.outlineGrey} ${styles.select}`
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
        {validationErrors.planDuration && (
          <p className={styles.validationErrorText}>
            Please select plan duration
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label htmlFor="amount" className={styles.label}>
          Amount
        </label>
        <input
          name="amount"
          type="text"
          value={state.amount}
          onChange={handleFormStateChange}
          className={
            validationErrors.beneficiaryBankCode
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.amount && (
          <p className={styles.validationErrorText}>Please enter amount</p>
        )}
      </div>
      <button type="submit" className={styles.button}>
        Submit
      </button>
    </form>
  );
};

RechargeCableForm.propTypes = {
  RechargeCableFormState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(RechargeCableForm);

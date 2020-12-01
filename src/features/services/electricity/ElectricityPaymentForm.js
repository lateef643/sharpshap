import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";

import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";

import {
  GET_ENERGY_VENDORS,
  VALIDATE_METER_NUMBER,
} from "../../../utils/constants";
import validateFormData from "../../../validation/validateFormData";

import styles from "./ElectricityPaymentForm.module.scss";

const ElectricityPaymentForm = (props) => {
  const {
    ElectricityPaymentFormState: state,
    setState,
    setComponentToRender,
  } = props;
  const [energyVendors, setEnergyVendors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);

  let serviceImageUrl = generateServiceProviderImageUrl(props.service);

  useEffect(() => {
    (async function fetchVendorsList() {
      const res = await axios.get(GET_ENERGY_VENDORS);
      const energyVendors = res.data.data;

      setEnergyVendors(energyVendors);
    })();
  }, []);

  useEffect(() => {
    let isCancelled;

    if (energyVendors) {
      const selectedEnergyVendor = energyVendors.find((vendor) => {
        return vendor.name === props.service.toUpperCase();
      });

      if (selectedEnergyVendor) {
        const selectedVendorCode = selectedEnergyVendor.name.trim();

        setState({
          type: "UPDATE_FORM_STATE",
          payload: { disco: selectedVendorCode },
        });
      }
    }

    return () => {
      isCancelled = true;
    };
  }, [energyVendors]);

  useEffect(() => {
    const { meterNo, disco, paymentPlan } = state;
    const req = {
      meter_number: meterNo,
      disco: disco,
      type: paymentPlan,
    };

    if (!isNaN(parseInt(meterNo)) && meterNo.length > 10) {
      setLoading(true);

      setState({
        type: "UPDATE_FORM_STATE",
        payload: { accountName: "" },
      });

      setValidationErrors({ ...validationErrors, accountName: "" });

      (async function validateMeterNumber() {
        try {
          const res = await axios.put(VALIDATE_METER_NUMBER, req);

          const customerName = res.data.data.name;

          setLoading(false);

          setState({
            type: "UPDATE_FORM_STATE",
            payload: { accountName: customerName },
          });
        } catch (e) {
          setValidationErrors({
            ...validationErrors,
            accountName: "Account validation failed please try again",
          });
          setLoading(false);
        }
      })();
    }
  }, [state.meterNo]);

  const handleOnContinue = (e) => {
    e.preventDefault();

    const properties = Object.keys(state);
    const errors = validateFormData(state, properties);

    setValidationErrors({ ...validationErrors, ...errors });

    if (Object.keys(errors).length > 0) return;

    setComponentToRender("summary");
  };

  const handleStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });

    setState({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => handleOnContinue(e)}
        autoComplete="off"
      >
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="paymentPlan">
            Plan
          </label>
          <div className={styles.formGroupSub}>
            <img
              className={styles.selectionImage}
              src={serviceImageUrl}
              alt=""
            />
            <select
              name="paymentPlan"
              onChange={(e) => handleStateChange(e)}
              className={
                validationErrors.paymentPlan
                  ? `${styles.outlineRed} ${styles.select}`
                  : `${styles.outlineGrey} ${styles.select}`
              }
            >
              <option value="">Select plan</option>
              <option value="PREPAID">PREPAID</option>
              <option value="POSTPAID">POSTPAID</option>
            </select>
          </div>
          {validationErrors.paymentPlan && (
            <p className={styles.validationErrorText}>
              Please select payment plan
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="meterNo">
            Meter Number
          </label>
          <input
            type="text"
            name="meterNo"
            value={state.meterNo}
            onChange={(e) => handleStateChange(e)}
            className={
              validationErrors.meterNo
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
          />
          {validationErrors.meterNo && (
            <p className={styles.validationErrorText}>
              Please enter meter number
            </p>
          )}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="accountName">
            Account Name
          </label>
          <input
            type="text"
            name="accountName"
            value={state.accountName}
            className={
              validationErrors.beneficiaryBankCode
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
            disabled
          />
          {loading && (
            <div className={styles.loader}>
              <ThreeDots />
            </div>
          )}
          {validationErrors.accountName && (
            <p className={styles.validationErrorText}>
              {validationErrors.accountName}
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
              onChange={(e) => handleStateChange(e)}
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
              onChange={(e) => handleStateChange(e)}
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
          <label className={styles.label} htmlFor="phone">
            Phone
          </label>
          <input
            name="phone"
            type="text"
            value={state.phone}
            onChange={(e) => handleStateChange(e)}
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
        <button type="submit" className={styles.button}>
          Continue
        </button>
      </form>
    </div>
  );
};

ElectricityPaymentForm.propTypes = {
  ElectricityPaymentFormState: PropTypes.object.isRequired,
  setState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(ElectricityPaymentForm);

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import validateFormData from "../../../validation/validateFormData";
import { LOAN_APPLICATION } from "../../../utils/constants";

import styles from "./AgentLoan.module.scss";

export const AgentLoan = ({ agentUuid }) => {
  const [validationErrors, setValidationErrors] = useState({ errors: true });
  const [formState, setFormState] = useState({ loanAmount: "", duration: "" });
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleOnChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const keys = Object.keys(formState);
    const errors = validateFormData(formState, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    requestLoan();
  };

  const requestLoan = () => {
    setLoading(true);

    (async function request() {
      const { loanAmount: amount, duration } = formState;

      const payload = { amount, duration, identifier: agentUuid };

      try {
        const res = await axios.post(LOAN_APPLICATION, payload);

        // setComponentToRender("status")

        addToast("Loan application was successful", {
          appearance: "error",
          autoDismiss: true,
        });
      } catch (e) {
        const message =
          e.response.data?.errors[0] || "Loan application was unsuccessful";

        addToast(message, {
          appearance: "error",
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  return (
    <form className={styles.form} autoComplete="off" onSubmit={handleOnSubmit}>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="amount">
          Amount
        </label>
        <input
          name="loanAmount"
          className={styles.input}
          type="text"
          value={formState.loanAmount}
          onChange={handleOnChange}
        />
        {validationErrors.loanAmount && (
          <p className={styles.errorText}>{validationErrors.loanAmount.text}</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="duration">
          Duration
        </label>
        <select
          name="duration"
          className={styles.input}
          type=""
          value={formState.duration}
          onChange={handleOnChange}
        >
          <option value="">Select duration</option>
          <option value="1">1 month</option>
        </select>
        {validationErrors.duration && (
          <p className={styles.errorText}>{validationErrors.duration.text}</p>
        )}
      </div>
      <button type="submit" className={styles.button}>
        {loading ? <ThreeDots /> : "Submit"}
      </button>
    </form>
  );
};

AgentLoan.propTypes = {
  AgentLoanState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
    agentUuid: state.auth.user.uuid,
  };
};

export default connect(mapStateToProps)(AgentLoan);

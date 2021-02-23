import React, { useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { useToasts } from "react-toast-notifications";
import { connect } from "react-redux";

import { UPDATE_USER_PASSWORD } from "../../utils/constants";
import validateFormData from "../../validation/validateFormData";

import styles from "./Password.module.scss";
import { setDisplayModal } from "../../actions/modal";

export const Password = ({ displayModal }) => {
  const [formState, setFormState] = useState({
    password: "",
    new_password: "",
    confirm_password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const { new_password, confirm_password } = formState;

    const payload = {
      new_password,
      confirm_password,
    };

    const keys = Object.keys(payload);
    const errors = validateFormData(formState, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return;

    submit();
  };

  const submit = () => {
    const payload = formState;
    setLoading(true);

    (async function changePassword() {
      try {
        const res = await axios.put(UPDATE_USER_PASSWORD, payload);

        if (res) {
          addToast("Password changed successfully", {
            appearance: "success",
            autoDismiss: true,
          });

          displayModal({
            overlay: false,
            modal: false,
            service: null,
          });
        }
      } catch (e) {
        addToast("An error occurred", {
          appearance: "error",
          autoDismiss: true,
        });
      } finally {
        setLoading(false);
      }
    })();
  };

  const handleSetFormState = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });

    setFormState({
      ...formState,
      [target.name]: target.value,
    });
  };
  console.log(formState);
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
          name="password"
          value={formState.password}
          type="password"
          onChange={(e) => handleSetFormState(e)}
          className={
            validationErrors.password
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.password && (
          <p className={styles.validationErrorText}>
            {validationErrors.password.text}
          </p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="new_password">
          New password
        </label>
        <input
          name="new_password"
          value={formState.new_password}
          type="password"
          onChange={(e) => handleSetFormState(e)}
          className={
            validationErrors.new_password
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.new_password && (
          <p className={styles.validationErrorText}>Please enter password</p>
        )}
      </div>
      <div className={styles.formGroup}>
        <label className={styles.label} htmlFor="confirm_password">
          Confirm password
        </label>
        <input
          name="confirm_password"
          value={formState.confirm_password}
          type="password"
          onChange={(e) => handleSetFormState(e)}
          className={
            validationErrors.confirm_password
              ? `${styles.outlineRed} ${styles.input}`
              : `${styles.outlineGrey} ${styles.input}`
          }
        />
        {validationErrors.confirm_password && (
          <p className={styles.validationErrorText}>Please enter password</p>
        )}
      </div>
      <button type="submit" className={styles.button}>
        {loading ? <ThreeDots /> : "Continue"}
      </button>
    </form>
  );
};

Password.propTypes = {
  networkList: PropTypes.array.isRequired,
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Password);

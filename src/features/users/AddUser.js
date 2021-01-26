import React, { useState } from "react";
import { connect } from "react-redux";
import { ThreeDots } from "svg-loaders-react";
import Axios from "axios";
import { useToasts } from "react-toast-notifications";
import { setDisplayModal } from "../../actions/modal";

import { CREATE_SUB_USER } from "../../utils/constants";
import { setCurrentPage } from "../../actions/page";
import styles from "./AddUser.module.scss";

export const AddUser = ({ changeCurrentPage, displayModal }) => {
  const { addToast } = useToasts();
  changeCurrentPage({
    heading: "Add User",
    search: false,
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [formState, setFormState] = useState({
    email: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  const handleOnChange = (e) => {
    e.preventDefault();

    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    (async function fetchWalletBalance() {
      try {
        const res = await Axios.post(CREATE_SUB_USER, formState);

        addToast("User created successfully", {
          appearance: "success",
          autoDismiss: false,
        });

        displayModal({
          overlay: false,
          modal: "",
          service: "",
          modalIsUpdated: res.data.data.email,
        });

        setLoading(false);
      } catch (e) {
        setLoading(false);

        addToast("An error occured", {
          appearance: "error",
          autoDismiss: false,
        });
      }
    })();
  };

  return (
    <div className={styles.container}>
      <form
        className={styles.form}
        onSubmit={(e) => handleOnSubmit(e)}
        autoComplete="off"
      >
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="amount">
            Phone number
          </label>
          <input
            name="phone"
            value={formState.phone}
            type="text"
            onChange={(e) => handleOnChange(e)}
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
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            name="email"
            value={formState.email}
            type="text"
            onChange={(e) => handleOnChange(e)}
            className={
              validationErrors.email
                ? `${styles.outlineRed} ${styles.input}`
                : `${styles.outlineGrey} ${styles.input}`
            }
          />
          {validationErrors.email && (
            <p className={styles.validationErrorText}>
              Please enter valid email
            </p>
          )}
        </div>
        <button type="submit" className={styles.button}>
          {loading ? <ThreeDots /> : "Create"}
        </button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(AddUser);

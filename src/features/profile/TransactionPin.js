import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";

import styles from "./TransactionPin.module.scss";

export const TransactionPin = (props) => {
  const [formState, setFormState] = useState({
    one: "",
    two: "",
    three: "",
    four: "",
  });

  const handleOnChange = ({ target }) => {
    setFormState({ ...formState, [target.name]: target.value });
  };

  return (
    <form className={styles.form} autoComplete="off">
      <div className={styles.formBanner}></div>
      <h3 className={styles.formHeading}>Transaction Pin</h3>
      <p className={styles.formText}>Enter your transaction pin to proceed</p>
      <div className={styles.formContainer}>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="one"
            onChange={handleOnChange}
            type="text"
            tabIndex="1"
            maxLength="1"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="two"
            onChange={handleOnChange}
            type="text"
            tabIndex="1"
            maxLength="1"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="three"
            onChange={handleOnChange}
            type="text"
            tabIndex="1"
            maxLength="1"
          />
        </div>
        <div className={styles.formGroup}>
          <input
            className={styles.input}
            name="four"
            tabIndex="1"
            onChange={handleOnChange}
            type="text"
            maxLength="1"
          />
        </div>
      </div>
      <button type="submit" className={styles.button}>
        Continue
      </button>
    </form>
  );
};

TransactionPin.propTypes = {
  TransactionPinState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default TransactionPin;

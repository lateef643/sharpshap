import React, { useState, useEffect } from "react";
import axios from "axios";

import { RESET_PASSWORD, FORGOT_PASSWORD } from "../../store/api/constants";

import styles from "./ForgotPassword.module.scss";

export const ForgotPassword = ({ history }) => {
  const [status, setStatus] = useState("token");
  const [verificationCode, setVerificationCode] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (password.length && confirmPassword !== password) {
      setHasError(true);
    } else {
      setHasError(false);
    }
  }, [confirmPassword]);

  const handleInputChange = ({ target }) => {
    if (target.name === "phone") {
      setPhone(target.value);
    } else if (target.name === "code") {
      setVerificationCode(target.value);
    } else if (target.name === "new") {
      setPassword(target.value);
    } else if (target.name === "confirm") {
      setConfirmPassword(target.value);
    }
  };

  const handleInitiateResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    const req = {
      account: phone,
    };

    (async function resetPassword() {
      try {
        const res = axios.post(FORGOT_PASSWORD, req);

        if (res) {
          setLoading(false);
          setStatus("verification");
        }
      } catch (e) {
        setLoading(false);
      }
    })();
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    setLoading(true);

    if (password && !hasError) {
      const req = {
        phone,
        code: verificationCode,
        password,
      };

      (async function resetPassword() {
        try {
          const res = axios.post(RESET_PASSWORD, req);
          setLoading(false);

          if (res) history.push("/");
        } catch (e) {
          setLoading(false);
        }
      })();
    }
  };

  return (
    <div className={styles.container}>
      {status === "token" && (
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={handleInitiateResetPassword}
        >
          <p className={styles.formHeading}>Forgot Password</p>
          <div className={styles.formGroup}>
            <label
              className={phone ? styles.notEmpty : styles.empty}
              htmlFor="phone"
            >
              Please enter phone number
            </label>
            <input
              name="phone"
              type="text"
              value={phone}
              onChange={handleInputChange}
              placeholder="Please enter phone number"
            />
          </div>
          <button className={styles.resetButton} type="submit">
            <span>{loading ? "Please wait..." : "Submit"}</span>
          </button>
        </form>
      )}
      {status === "verification" && (
        <form
          className={styles.form}
          autoComplete="off"
          onSubmit={handleResetPassword}
        >
          <p className={styles.formHeading}>Reset Password</p>
          <div className={styles.formGroup}>
            <label
              className={verificationCode ? styles.notEmpty : styles.empty}
              htmlFor="code"
            >
              Verification Code
            </label>
            <input
              name="code"
              type="text"
              value={verificationCode}
              onChange={handleInputChange}
              placeholder="Verification code"
            />
          </div>
          <div className={styles.formGroup}>
            <label
              className={password ? styles.notEmpty : styles.empty}
              htmlFor="new"
            >
              New password
            </label>
            <input
              name="new"
              type="password"
              value={password}
              onChange={handleInputChange}
              placeholder="New password"
            />
          </div>
          <div className={styles.formGroup}>
            <label
              className={confirmPassword ? styles.notEmpty : styles.empty}
              htmlFor="confirm"
            >
              Confirm password
            </label>
            <input
              name="confirm"
              type="password"
              value={confirmPassword}
              onChange={handleInputChange}
              placeholder="Confirm password"
            />
            {hasError && (
              <span className={styles.errorText}>Passwords do not match</span>
            )}
          </div>
          <button className={styles.resetButton} type="submit">
            <span>{loading ? "Please wait..." : "Reset"}</span>
          </button>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;

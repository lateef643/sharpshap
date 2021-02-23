import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import Loader from "../components/util/Loader";
import { startLoginUser } from "../actions/auth";
import logo from "../assets/images/cico-logo-login.svg";
import eyeOpen from "../assets/images/eyeOpen.svg";
import eyeClosed from "../assets/images/eyeClosed.svg";
import caution from "../assets/images/warning-svgrepo-com.svg";
import image from "../assets/images/login.png";

import styles from "./Login.module.scss";

export const Login = (props) => {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(props.loading);
  const [error, setError] = useState(props.message);
  const [toggleReveal, setToggleReveal] = useState(false);

  //Accessing the login error message from the server
  useEffect(() => {
    setError(props.message);
    setLoading(props.loading);
  }, [props]);

  const payload = {
    user: {
      phone,
      password,
    },
    type: "agent",
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    //Dispatching loading state to the error reducer to indicate loading
    //Auth action in actions folder dispatches loading: false and server
    //error message if error
    props.dispatch({
      type: "SET_LOADING",
      payload: {
        loading: true,
        message: undefined,
      },
    });
    props.startLoginUser(payload);
  };

  const handlephoneChange = (e) => {
    const newphone = e.target.value;
    setError(undefined);
    setphone(newphone);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setError(undefined);
    setPassword(newPassword);
  };

  return (
    <div className={styles.container}>
      <div className={styles.imageSection}>
        <div className={styles.imageBox}>
          <img src={image} alt="hello illustration" />
          <p>Login</p>
        </div>
      </div>
      <div className={styles.formSection}>
        <div className={styles.formContainer}>
          <form className={styles.form} onSubmit={handleOnSubmit}>
            <img className={styles.logo} src={logo} alt="Cico logo" />
            {error ? (
              <p className={styles.error}>
                <img src={caution} alt="caution icon" />
                <span>{error}</span>
              </p>
            ) : undefined}
            <div className={styles.formGroup}>
              <label htmlFor="phone"></label>
              <input
                name="phone"
                type="text"
                placeholder="Phone Number"
                onChange={handlephoneChange}
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="password"></label>
              <input
                name="password"
                type={!toggleReveal ? "password" : "text"}
                placeholder="Password"
                onChange={handlePasswordChange}
              />
              <span
                onClick={() => {
                  setToggleReveal(!toggleReveal);
                }}
              >
                <img src={!toggleReveal ? eyeOpen : eyeClosed} alt="eye icon" />
              </span>
            </div>
            <div className={styles.formGroup}>
              <p>
                <Link to="/forgot-password" className={styles.forgotPassword}>
                  Forgot password?
                </Link>
              </p>
            </div>
            <button>
              {loading ? <Loader color="white" size="small" /> : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoginUser: (payload) => dispatch(startLoginUser(payload)),
    dispatch: dispatch,
  };
};

const mapStateToProps = (state) => {
  return {
    loading: state.error.loading,
    message: state.error.message,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

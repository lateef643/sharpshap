import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import Loader from "../partials/Loader";
import { startLoginUser } from "../../actions/auth";
import logo from "../../assets/images/cico-logo-login.svg";
import eye from "../../assets/images/eye-svgrepo-com.svg";
import blind from "../../assets/images/blind-symbol-of-an-opened-eye-with-a-slash-svgrepo-com.svg";
import caution from "../../assets/images/warning-svgrepo-com.svg";
import image from "../../assets/images/login.png";

import styles from "./Login.module.scss";

export const Login = (props) => {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(props.loading);
  const [error, setError] = useState(props.message);
  const [toggleReveal, setToggleReveal] = useState(false);

  useEffect(() => {
    setError(props.message);
    setLoading(props.loading);
  }, [props])

  const payload = {
    user: {
      phone,
      password
    },
    type: "agent"
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    props.dispatch({
        type: "SET_LOADING",
        payload: {
          loading: true,
          message: undefined       
        }
      })
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
            {error ? <p className={styles.error}><img src={caution} /><span>{error}</span></p> : undefined}
            <label>
              <input type="text" placeholder="Phone Number" onChange={handlephoneChange} />
            </label>
            <label>
              <input type={!toggleReveal ? "password" : "text"} placeholder="Password" onChange={handlePasswordChange} />
              <span onClick={() => {
                setToggleReveal(!toggleReveal)
              }}><img src={!toggleReveal ? eye : blind} /></span>
            </label>
              <button>{loading ? <Loader color="white" size="small" /> : "Login" }</button>
          </form>        
        </div>
      </div>
    </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoginUser: payload => dispatch(startLoginUser(payload)),
    dispatch: dispatch
  }
};

const mapStateToProps = (state) => {
  return {
    loading: state.error.loading,
    message: state.error.message
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
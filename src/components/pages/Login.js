import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Loader from "../partials/Loader";
import { startLoginUser } from "../../actions/auth";
import style from "./Login.module.scss";
import logo from "../../assets/images/cico-logo-login.svg";
import image from "../../assets/images/login.png";

export const Login = (props) => {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(props.loading);
  const [error, setError] = useState(props.message);

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
    <div className={style.container}>
      <div className={style.imageSection}>
        <div className={style.imageBox}>
          <img src={image} alt="hello illustration" />
          <p>Login</p>        
        </div>
      </div>
      <div className={style.formSection}>
        <div className={style.formContainer}>
          <div>
            <img src={logo} alt="Cico logo" />
          </div>
          <form className={style.form} onSubmit={handleOnSubmit}>
            {error ? <p className={style.error}>{error}</p> : undefined}
            <label>
              <input type="text" placeholder="Phone Number" onChange={handlephoneChange} />
            </label>
            <label>
              <input type="password" placeholder="Password" onChange={handlePasswordChange} />
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
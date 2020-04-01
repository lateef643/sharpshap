import React, { useState } from "react";
import { connect } from "react-redux";
import { startLoginUser } from "../../actions/auth";
import style from "./Login.module.scss";
import logo from "../../assets/images/cico-logo-login.svg";
import image from "../../assets/images/login.png";

export const Login = (props) => {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");

  const payload = {
    user: {
      phone,
      password
    },
    type: "agent"
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    props.startLoginUser(payload);
  };

  const handlephoneChange = (e) => {
    const newphone = e.target.value;
    setphone(newphone);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
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
            <label>
              <input type="text" placeholder="Phone Number" onChange={handlephoneChange} />
            </label>
            <label>
              <input type="password" placeholder="Password" onChange={handlePasswordChange} />
            </label>
            <button>Login</button>
          </form>        
        </div>
      </div>
    </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    startLoginUser: payload => dispatch(startLoginUser(payload))
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    ownProps: ownProps
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
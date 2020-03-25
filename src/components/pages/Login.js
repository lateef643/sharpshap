import React, { useState } from "react";
import "./Login.scss";
import logo from "../../assets/images/cico-logo-login.svg";
import image from "../../assets/images/login.png";

const Login = (props) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      phoneNumber,
      password
    })
  };

  const handlePhoneNumberChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
  };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  };
  
  return (
    <div className="login">
      <div className="login__section--image">
        <div className="login__section--image__container">
          <img src={image} />
          <p>Login</p>        
        </div>
      </div>
      <div className="login__section--form">
        <div className="login__section--form__container">
          <div className="login__logo-box">
            <img src={logo} />
          </div>
          <form className="login__form" onSubmit={handleOnSubmit}>
            <label>
              <input type="text" placeholder="Phone Number" onChange={handlePhoneNumberChange} />
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

export default Login;
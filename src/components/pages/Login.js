import React, { useState } from "react";
import style from "./Login.module.scss";
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
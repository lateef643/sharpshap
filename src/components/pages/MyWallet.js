import React, { useState } from "react";
import './MyWallet.scss';

const MyWallet = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      firstname,
      lastname,
      phoneNumber,
      email,
      password,
      confirmPassword
    })
  };

  const handleFirstnameChange = (e) => {
    const newFirstname = e.target.value;
    setFirstname(newFirstname);
  };

  const handleLastnameChange = (e) => {
    const newLastname = e.target.value;
    setLastname(newLastname);
  }

  const handlePhoneChange = (e) => {
    const newPhoneNumber = e.target.value;
    setPhoneNumber(newPhoneNumber);
  }

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }

  const handleConfirmPasswordChange = (e) => {
    const password2 = e.target.value;
    setConfirmPassword(password2);
  }

  return (
  <div className="my-wallet">
    <form className="form my-wallet__form" onSubmit={handleOnSubmit} >
      <div className="my-wallet__text-box">
        <span>1. Details</span><span>2. Change Password</span>
      </div>
      <label>
        <span>Firstname</span>
        <input type="text" onChange={handleFirstnameChange} />      
      </label>
      <label>
        <span>Lastname</span>
        <input type="text" onChange={handleLastnameChange} />      
      </label>    
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneChange} />      
      </label>    
      <label>
        <span>Email</span>
        <input type="text" onChange={handleEmailChange} />      
      </label>    
      <label>
        <span>Password</span>
        <input type="text" onChange={handlePasswordChange} />      
      </label>    
      <label>
        <span>Confirm Password</span>
        <input type="text" onChange={handleConfirmPasswordChange} />      
      </label>   
      <button type="submit">Save Changes</button>
    </form>    
  </div>
)}

export default MyWallet;
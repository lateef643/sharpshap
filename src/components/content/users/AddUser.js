import React, { useState } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import style from './AddUser.module.scss';

export const AddUser = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: 'Add User',
    search: false
  });

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
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit} >
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
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(AddUser);
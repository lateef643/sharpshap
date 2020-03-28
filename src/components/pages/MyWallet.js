import React, { useState } from "react";
import style from './MyWallet.module.scss';

const MyWallet = (props) => {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [modal, setModal] = useState(false);

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

  const handleOnPasswordChangeSubmit = (e) => {
    e.preventDefault();
    console.log({
      oldPassword,
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

  const handleOldPasswordChange = (e) => {
    const oldPassword = e.target.value;
    setOldPassword(oldPassword);
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
    <form className={style.detailsForm} onSubmit={handleOnSubmit} >
      <div>
        <span>1. Details</span><span className={style.startModal} onClick={(e) => {
          e.preventDefault();
          setModal(true);
        }}>2. Change Password</span>
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
    {modal ? <div className={style.passwordModal}>
      <span onClick={(e) => {
        e.preventDefault();
        setModal(false);
      }}>X</span>
      <form className={style.passwordForm} onSubmit={handleOnPasswordChangeSubmit} >
        <label>
          <span>Old Password</span>
          <input type="text" onChange={handleOldPasswordChange} />      
        </label>
        <label>
          <span>New Password</span>
          <input type="text" onChange={handlePasswordChange} />      
        </label>    
        <label>
          <span>Confirm Password</span>
          <input type="text" onChange={handleConfirmPasswordChange} />      
        </label>        
        <button type="submit">Submit</button>
      </form> 
    </div> : undefined}
  </div>
)}

export default MyWallet;
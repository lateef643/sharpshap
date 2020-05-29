import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../../partials/Loader";
import { UPDATE_USER } from "../../../store/api/constants";
import { UPDATE_USER_PASSWORD } from "../../../store/api/constants";
import { setCurrentPage } from "../../../actions/page";
import styles from './Profile.module.scss';
import { startLogout } from "../../../actions/auth";

export const Profile = (props) => {
  const [firstname, setFirstname] = useState(props.firstname);
  const [lastname, setLastname] = useState(props.lastname);
  const [phoneNumber, setPhoneNumber] = useState(props.phone);
  const [email, setEmail] = useState(props.email);
  const [oldPassword, setOldPassword] = useState("");
  const [businessName, setBusinessName] = useState(props.businessName)
  const [password, setPassword] = useState("");
  const [address, setAddress] = useState(props.address);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({});
  const [modal, setModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    props.changeCurrentPage({
      heading: "Profile",
      search: true
    });    
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      "user": { 
        address
      }
    };

    axios.post(UPDATE_USER, payload)
      .then(res => {
        // console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  };

  const handleOnPasswordChangeSubmit = (e) => {
    e.preventDefault();
    setPasswordLoading(true);

    const payload = {
      "new_password" : password,
      "confirm_password" : confirmPassword
    };

    axios.put(UPDATE_USER_PASSWORD, payload)
    .then(res => {
      setPasswordLoading(false);
      setModal(false);
      props.startLogout();
    })
    .catch(err => {
      setPasswordLoading(false);
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

  const handleAddressChange = (e) => {
    const address = e.target.value;
    setAddress(address);
  }

  const handleBusinessNameChange = (e) => {
    const businessName = e.target.value;
    setBusinessName(businessName);
  }

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
  }

  const handleConfirmPasswordChange = (e) => {
    const password2 = e.target.value;

    if (password2 === password) {
      setConfirmPassword(password2);
      setError({...error, passwordCheck: undefined});
    } else {
      setError({...error, passwordCheck: "Passwords do not match"});
    }
  };

  return (
  <div className={styles.container}>
    <form className={styles.form} onSubmit={handleOnSubmit} >
      <div className={styles.optionsContainer}>
        <span className={styles.detailsText}>1. Details</span>
        <span className={styles.startModal} onClick={(e) => {
          e.preventDefault();
          setModal(true);
        }}>2. Change Password</span>
      </div>
      <label>
        <span>Firstname</span>
        <input type="text" disabled={true} className={styles.outlineGrey} onChange={handleFirstnameChange} value={firstname} />
      </label>
      <label>
        <span>Lastname</span>
        <input type="text" disabled={true} className={styles.outlineGrey} onChange={handleLastnameChange} value={lastname}/>      
      </label>    
      <label>
        <span>Phone Number</span>
        <input type="text" disabled={true} className={styles.outlineGrey} onChange={handlePhoneChange} value={phoneNumber} />      
      </label>    
      <label>
        <span>Email</span>
        <input type="text" disabled={true} className={styles.outlineGrey} onChange={handleEmailChange} value={email} />      
      </label>  
      <label>
        <span>Business Name</span>
        <input type="text" disabled={true} className={styles.outlineGrey} onChange={handleBusinessNameChange} Value={businessName} />      
      </label>   
      <label>
        <span>Address</span>
        <input type="text" className={styles.outlineGrey} onChange={handleAddressChange} value={address} />      
      </label>    
      <button type="submit">{loading ? <Loader color="white" size="small" position="small" /> : "Submit"}</button>
    </form>
    {modal ? <div className={styles.passwordModal}>
      <span onClick={(e) => {
        e.preventDefault();
        setError({...error, passwordCheck: undefined});
        setModal(false);
      }}>X</span>
      <form className={styles.form} onSubmit={handleOnPasswordChangeSubmit} >
        <label>
          <span>Old Password</span>
          <input type="password" className={styles.outlineGrey} onChange={handleOldPasswordChange} />      
        </label>
        <label>
          <span>New Password</span>
          <input type="password" className={styles.outlineGrey} onChange={handlePasswordChange} />      
        </label>    
        <label>
          {error.passwordCheck ? <p className={styles.error}>{error.passwordCheck}</p> : undefined}
          <span>Confirm Password</span>
          <input type="password" className={styles.outlineGrey} onChange={handleConfirmPasswordChange} />      
        </label>        
        <button type="submit">{passwordLoading ? <Loader color="white" size="small" position="center" /> : "Submit"}</button>
      </form> 
    </div> : undefined}
  </div>
)}

const mapStateToProps = state => {
  return {
    firstname: state.auth.user.agent.first_name,
    lastname: state.auth.user.agent.last_name,
    businessName: state.auth.user.agent.business_name,
    email: state.auth.user.agent.email,
    phone: state.auth.user.agent.business_phone,
    address: state.auth.user.agent.business_address,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload)),
    startLogout: () => dispatch(startLogout())
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
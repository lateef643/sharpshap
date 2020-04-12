import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import Loader from "../../partials/Loader";
import { UPDATE_USER } from "../../../store/api/constants";
import { UPDATE_USER_PASSWORD } from "../../../store/api/constants";
import { setCurrentPage } from "../../../actions/page";
import style from './Profile.module.scss';

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
    setLoading(true);

    const payload = {
      oldPassword,
      password
    };

    axios.post(UPDATE_USER_PASSWORD, payload)
    .then(res => {
      // console.log(res);
    })
    .catch(err => {
      console.log(err);
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
        <input type="text" disabled={true} onChange={handleFirstnameChange} value={firstname} />
      </label>
      <label>
        <span>Lastname</span>
        <input type="text" disabled={true} onChange={handleLastnameChange} value={lastname}/>      
      </label>    
      <label>
        <span>Phone Number</span>
        <input type="text" disabled={true} onChange={handlePhoneChange} value={phoneNumber} />      
      </label>    
      <label>
        <span>Email</span>
        <input type="text" disabled={true} onChange={handleEmailChange} Value={email} />      
      </label>  
      <label>
        <span>Business Name</span>
        <input type="text" disabled={true} onChange={handleBusinessNameChange} Value={businessName} />      
      </label>   
      <label>
        <span>Address</span>
        <input type="text" onChange={handleAddressChange} value={address} />      
      </label>    
      <button type="submit">{loading ? <Loader color="white" size="small" position="small" /> : "Submit"}</button>
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
          {error.passwordCheck ? <p className={style.error}>{error.passwordCheck}</p> : undefined}
          <span>Confirm Password</span>
          <input type="text" onChange={handleConfirmPasswordChange} />      
        </label>        
        <button type="submit">Submit</button>
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
}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
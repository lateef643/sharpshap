import React, { useState } from "react";
import PropTypes from "prop-types";

import validateFormData from "../../../../validation/validateFormData";
import mtn from "../../../../assets/images/MTN Logo.svg";
import _9mobile from "../../../../assets/images/9mobile.svg";
import airtel from "../../../../assets/images/Airtel.svg";
import glo from "../../../../assets/images/glo.svg";

import styles from "./BuyAirtimeForm.module.scss";

export const BuyAirtimeForm = (props) => {
  const { networkList, AirtimePurchaseFormState: state, dispatch, setComponentToRender } = props;
  const [validationErrors, setValidationErrors] = useState({});

  //Dynamically render network logo
  let telcoImageUrl;

  switch (state.network) {
    case "A04E":
      telcoImageUrl = mtn;
      break;
    case "A02E":
      telcoImageUrl = _9mobile;
      break;
    case "A03E":
      telcoImageUrl = glo;
      break;
    case "A01E":
      telcoImageUrl = airtel;
      break;
    default:
      telcoImageUrl = mtn;
      break;
  }

  const handleOnContinue = (e) => {
    e.preventDefault();

    const keys = Object.keys(state);
    const errors = validateFormData(state, keys);

    setValidationErrors(errors);

    if (Object.keys(errors).length > 0) return 
    
    setComponentToRender("summary");
  }

  const handleSetFormState = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value }
    });
  }
  
  return (
    <form className={styles.form} 
      onSubmit={(e) => handleOnContinue(e)} 
      autoComplete="off"
    >
      <div className={styles.imageContainer}>
        <img src={telcoImageUrl} className={styles.image} />
      </div>
      <label>
        <span>Network</span>
        <select 
          name="network"
          value={state.network}
          onChange={(e) => handleSetFormState(e)} 
          className={validationErrors.network ? styles.outlineRed : styles.outlineGrey}>
          <option value="">Select Network</option>
          {networkList.map((telco, index) => {
            return <option value={telco.code} key={index}>{telco.name}</option>
          })}
        </select>  
        {validationErrors.network ? <p className={styles.validationErrorText}>Please select network</p> : undefined}
      </label>
      <label>
        <span>Amount</span>
        <input 
          type="text"
          name="amount"
          value={state.amount} 
          onChange={(e) => handleSetFormState(e)} 
          className={validationErrors.amount ? styles.outlineRed : styles.outlineGrey} 
        />   
        {validationErrors.amount ? <p className={styles.validationErrorText}>Please enter amount</p> : undefined}
      </label>    
      <label>
        <span>Phone Number</span>
        <input 
          type="text"
          name="phone"
          value={state.phone} 
          onChange={(e) => handleSetFormState(e)} 
          className={validationErrors.phone ? styles.outlineRed : styles.outlineGrey} 
        />  
        {validationErrors.phone ? <p className={styles.validationErrorText}>Please enter valid phone number</p> : undefined}
      </label>
      <button type="submit">Continue</button>
    </form>
  )
}

BuyAirtimeForm.propTypes = {
  networkList: PropTypes.array.isRequired,
  AirtimePurchaseFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
}

export default BuyAirtimeForm;
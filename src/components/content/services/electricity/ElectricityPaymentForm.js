import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";

import { GET_ENERGY_VENDORS } from "../../../../store/api/constants";
import { VALIDATE_METER_NUMBER } from "../../../../store/api/constants";
import validateFormData from "../../../../validation/validateFormData";
import ikedc from "../../../../assets/images/ikedc.png";
import aedc from "../../../../assets/images/Abuja electricity.png";
import kedc from "../../../../assets/images/Kaduna.png";
import kaedc from "../../../../assets/images/Kano.png";
import ibedc from "../../../../assets/images/ibedc.png";
import phedc from "../../../../assets/images/Ph.png";

import styles from './ElectricityPaymentForm.module.scss';

const ElectricityPaymentForm = (props) => {
  const { ElectricityPaymentFormState:state, dispatch, setComponentToRender } = props;
  const [energyVendors, setEnergyVendors] = useState([]);
  const [accountName, setAccountName] = useState("");
  const [validationErrors, setValidationErrors] = useState({});

  useEffect(() => {
    (async function fetchVendorsList() {
      const res = await axios.get(GET_ENERGY_VENDORS);
      const energyVendors = res.data.data;

      setEnergyVendors(energyVendors);
    })();
  }, []);

  useEffect(() => {
    const { meterNo, disco, paymentPlan } = state;
    const req = {
      "meter_number": meterNo,
      "disco": disco,
      "type": paymentPlan
    };

    (async function validateMeterNumber() {
      try {
        const res = await axios.put(VALIDATE_METER_NUMBER, req);

        // setAccountName(accountName);
      } catch(e) {
        // setValidationErrors({...validationErrors, accountName: "Account validation failed please try again"});
      }
    })();
  }, [state.meterNo]);

  //Change form image url on disco change
  let imageUrl;

  switch(state.disco) {
    case "IKEJA":
      imageUrl = ikedc;
      break;
    case "EKO":
      imageUrl = ikedc;
      break;
    case "PH":
      imageUrl = phedc;
      break;
    case "KANO":
      imageUrl = kaedc;
      break;
    case "KADUNA":
      imageUrl = kedc;
      break;
    case "IBADAN":
      imageUrl = ibedc;
      break;
    case "ABUJA":
      imageUrl = aedc;
      break;
    default:
      imageUrl = ikedc;
  }

  const handleOnContinue = (e) => {
    e.preventDefault();

    const properties = Object.keys(state);
    const errors = validateFormData(state, properties);

    setValidationErrors({ ...validationErrors, ...errors});
    console.log(errors);

    if (Object.keys(errors).length > 0) return

    setComponentToRender("summary");
  };

  const handleStateChange = ({ target }) => {
    setValidationErrors({ ...validationErrors, [target.name]: false });
    dispatch({
      type: "UPDATE_FORM_STATE",
      payload: { [target.name]: target.value },
    });
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={(e) => handleOnContinue(e)} autoComplete="off" >
        <div className={styles.imageContainer}>
          <img 
            src={imageUrl} 
            className={styles.image} 
            alt="Electricity Vendor's logo" 
          />        
        </div>
        <label>
          <span>Disco</span>
          <select 
            type="text" 
            name="disco"
            value={state.disco}
            className={validationErrors.disco ? styles.outlineRed : styles.outlineGrey}
            onChange={(e) => handleStateChange(e)}
          >
            <option value="">Select Disco</option>
            {energyVendors.map((vendor, index) => {
              return <option 
                key={`${index}-${vendor.name}`} 
                value={vendor.buypower_code}>{vendor.name}</option>
            })}
          </select>
          {validationErrors.disco ? <p className={styles.validationErrorText}>Please select disco</p> : undefined}
        </label>
        <label>
          <span>Plan</span>
          <select 
            type="text" 
            name="paymentPlan"
            value={state.paymentPlan}
            className={validationErrors.paymentPlan ? styles.outlineRed : styles.outlineGrey}
            onChange={(e) => handleStateChange(e)}
          >
            <option value="">Select plan</option>
            <option value="PREPAID">PREPAID</option>
            <option value="POSTPAID">POSTPAID</option>
          </select>
          {validationErrors.paymentPlan ? <p className={styles.validationErrorText}>Please select payment plan</p> : undefined}
        </label>   
        <label>
          <span>Meter Number</span>
          <input 
            type="text" 
            name="meterNo"
            value={state.meterNo}
            className={validationErrors.meterNo ? styles.outlineRed : styles.outlineGrey}
            onChange={(e) => handleStateChange(e)}
          />
          {validationErrors.meterNo ? <p className={styles.validationErrorText}>Please enter meter number</p> : undefined}
        </label>
        <label>
          <span>Account Name</span>
          <input 
            type="text" 
            name="accountName"
            value={state.accountName}
            className={styles.outlineGrey}
            onChange={(e) => handleStateChange(e)}
          />  
          {validationErrors.accountName ? <p className={styles.validationErrorText}>{validationErrors.accountName}</p> : undefined}
        </label> 
        <label>
          <span>Amount</span>
          <input 
            type="text" 
            name="amount"
            value={state.amount}
            className={validationErrors.amount ? styles.outlineRed : styles.outlineGrey}
            onChange={(e) => handleStateChange(e)}
          />  
          {validationErrors.amount ? <p className={styles.validationErrorText}>Please enter amount</p> : undefined}
        </label>   
        <label>
          <span>Phone</span>
          <input 
            type="text" 
            name="phone"
            value={state.phone}
            className={validationErrors.phone ? styles.outlineRed : styles.outlineGrey}
            onChange={(e) => handleStateChange(e)}
          />  
          {validationErrors.phone ? <p className={styles.validationErrorText}>Please enter valid phone number</p> : undefined}
        </label>       
        <button type="submit">Continue</button>
      </form>    
    </div>
)};

ElectricityPaymentForm.propTypes = {
  ElectricityPaymentFormState: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

export default ElectricityPaymentForm;
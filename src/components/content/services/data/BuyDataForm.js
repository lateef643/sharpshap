import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_DATA_PLANS } from "../../../../store/api/constants";
import mtn from "../../../../assets/images/MTN Logo.svg";
import _9mobile from "../../../../assets/images/9mobile.svg";
import airtel from "../../../../assets/images/Airtel.svg";
import glo from "../../../../assets/images/glo.svg";
import data from "../../../../assets/images/smartphone.svg"
import styles from "./BuyDataForm.module.scss";

export const BuyDataForm = (props) => {
  const telcoList = 
    [{code: "D01D", id: 5, name: "Airtel", type: "Data"},
    {code: "D02D", id: 6, name: "9 Mobile", type: "Data"},
    {code: "D03D", id: 7, name: "Globacom", type: "Data"},
    {code: "D04D", id: 8, name: "MTN", type: "Data"}];
  const {handleTelcoChange, handlePhoneChange, handleSelectedDataPlanIdChange,
  setDataPlans, amount, phone, telcoName, setValidationError, validationError, selectedDataPlanId, setComponentToRender, telco, dataPlans } = props;

  useEffect(() => {
    const payload = {
      telco
    };

    axios.post(GET_DATA_PLANS, payload)
      .then(res => {
        const dataPlans = res.data.data;
        setDataPlans(dataPlans);
      })
      .catch(err => {
        console.log(err);
      })
  }, [telco]);

    //Dynamically render telco logo
    let telcoImageUrl = "";

    telcoImageUrl = telcoName === "MTN" ? mtn
    : telcoName === "9 Mobile" ?  _9mobile : telcoName === "Globacom" ? glo
    : telcoName === "Airtel" ? airtel: mtn;

  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();

      if (telco && amount && phone && selectedDataPlanId) {
        setComponentToRender("summary");
      } else {
        setTimeout(() => {
          setValidationError({ ...validationError, telco: !telco, phone: !phone, selectedDataPlanId: !selectedDataPlanId });
        }, 2000); 
      }
    }} >
      <div className={styles.imageContainer}>
        <img src={telcoImageUrl} className={styles.image} />
      </div>
      <label>
        <span>Network</span>
        <select onChange={handleTelcoChange} className={validationError.telco ? styles.outlineRed : styles.outlineGrey} >
          <option value="">Select Network</option>
          {telcoList.map((telco, index) => {
            return <option value={JSON.stringify(telco)} key={index}>{telco.name}</option>
          })}
        </select>  
        {validationError.telco ? <p className={styles.validationErrorText}>Please select network</p> : undefined}
      </label>
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneChange} className={validationError.phone ? styles.outlineRed : styles.outlineGrey} />   
        {validationError.phone ? <p className={styles.validationErrorText}>Please enter phone number</p> : undefined}
      </label>    
      <label>
        <span>Data Plan</span>
        <select onChange={handleSelectedDataPlanIdChange} className={validationError.selectedDataPlanId ? styles.outlineRed : styles.outlineGrey} >
          <option value="">Select Data Plan</option>
          {dataPlans.map((plan, index) => {
            return <option value={JSON.stringify(plan)} key={index}>{plan.databundle}</option>
          })}
        </select> 
        {validationError.selectedDataPlanId ? <p className={styles.validationErrorText}>Please select data plan</p> : undefined}
      </label> 
      <label>
        <span>Amount</span>
        <input type="text" disabled={true} value={amount} className={styles.outlineGrey} />
      </label>
      <button type="submit">Continue</button>
    </form>
  )
};

export default BuyDataForm;
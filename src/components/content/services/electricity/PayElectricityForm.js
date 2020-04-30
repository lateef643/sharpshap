import React, { useState } from "react";
import styles from './PayElectricityForm.module.scss';

const PayElectricityForm = (props) => {
  const [meterNumber, setMeterNumber] = useState("");
  const [plan, setPlan] = useState("");
  const [prepaid, setPrepaid] = useState("");
  const [amount, setAmount] = useState("");

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      meterNumber,
      plan,
      prepaid,
      amount
    })
  };

  const handleMeterNumberChange = (e) => {
    const meterNumber = e.target.value;
    setMeterNumber(meterNumber);
  };

  const handlePlanChange = (e) => {
    const plan = e.target.value;
    setPlan(plan);
  };

  const handlePrepaidChange = (e) => {
    const prepaid = e.target.value;
    setPrepaid(prepaid);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setAmount(newAmount);
  };

  return (
  <div className={styles.container}>
    <form className={styles.form} onSubmit={handleOnSubmit} >
      <div className={styles.imageContainer}>
        <img src={props.vendorImage} className={styles.image} alt="Vendor's logo" />        
      </div>
      <label>
        <span>Meter Number</span>
        <input type="text" className={styles.outlineGrey} onChange={handleMeterNumberChange} />      
      </label>
      <label>
        <span>Payment Plan</span>
        <input type="text" className={styles.outlineGrey} onChange={handlePlanChange} />      
      </label>
      <label>
        <span>Prepaid</span>
        <input type="text" className={styles.outlineGrey} onChange={handlePrepaidChange} />      
      </label>    
      <label>
        <span>Amount</span>
        <input type="text" className={styles.outlineGrey} onChange={handleAmountChange} />      
      </label>         
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default PayElectricityForm;
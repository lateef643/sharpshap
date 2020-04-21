import React, { useState } from "react";
import style from './PayElectricityForm.module.scss';

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
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit} >
      <div className={style.imageContainer}>
        <img src={props.vendorImage} className={style.image} alt="Vendor's logo" />        
      </div>
      <div className={style.inputContainer}>
        <label>
          <span>Meter Number</span>
          <input type="text" onChange={handleMeterNumberChange} />      
        </label>
        <label>
          <span>Payment Plan</span>
          <input type="text" onChange={handlePlanChange} />      
        </label>
        <label>
          <span>Prepaid</span>
          <input type="text" onChange={handlePrepaidChange} />      
        </label>    
        <label>
          <span>Amount</span>
          <input type="text" onChange={handleAmountChange} />      
        </label>         
      </div>
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default PayElectricityForm;
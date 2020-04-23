import React, { useEffect, useState } from "react";
import telephone from "../../../../assets/images/telephone.svg";
import styles from "./BuyAirtimeForm.module.scss";

export const BuyAirtimeForm = (props) => {
  const telcoList = 
    [{code: "A01E", id: 1, name: "Airtel", type: "Airtime"},
    {code: "A02E", id: 2, name: "9 Mobile", type: "Airtime"},
    {code: "A03E", id: 3, name: "Globacom", type: "Airtime"},
    {code: "A04E", id: 4, name: "MTN", type: "Airtime"}];
  const { setComponentToRender, handleTelcoChange, handlePhoneChange, handleAmountChange, 
    amount, phone, telco, validationError, setValidationError } = props;

  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();

      if (amount && phone && telco) {
        setComponentToRender("summary");
      } else {
        setTimeout(() => {
          setValidationError({ ...validationError, telco: !telco, phone: !phone, amount: !amount });
        }, 2000);        
      }
    }}>
      <div className={styles.imageContainer}>
        <img src={telephone} className={styles.image} />
      </div>
      <div className={styles.inputContainer}>
        <label>
          <span>Network</span>
          <select onChange={handleTelcoChange} className={validationError.telco ? styles.outlineRed : styles.outlineGrey}>
            <option value="">Select Network</option>
            {telcoList.map((telco, index) => {
              return <option value={JSON.stringify(telco)} key={index}>{telco.name}</option>
            })}
          </select>  
          {validationError.telco ? <p className={styles.validationErrorText}>Please select network</p> : undefined}
        </label>
        <label>
          <span>Amount</span>
          <input type="number" value={amount} onChange={handleAmountChange} className={validationError.amount ? styles.outlineRed : styles.outlineGrey} />   
          {validationError.amount ? <p className={styles.validationErrorText}>Please enter amount</p> : undefined}
        </label>    
        <label>
          <span>Phone Number</span>
          <input type="text" value={phone} onChange={handlePhoneChange} className={validationError.phone ? styles.outlineRed : styles.outlineGrey} />  
          {validationError.phone ? <p className={styles.validationErrorText}>Please enter phone number</p> : undefined}
        </label>
      </div>
      
      <button type="submit">Continue</button>
    </form>
  )
};

export default BuyAirtimeForm;
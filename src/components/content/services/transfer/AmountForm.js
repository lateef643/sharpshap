import React, { useState } from "react";
import style from './AmountForm.module.scss';

const AmountForm = (props) => {
  const [errors, setErrors] = useState({
    amount: true,
    phoneNumber: true
  });
  return (
  <div className={style.amount}>
    <form className={style.form} onSubmit={(e) => {
      e.preventDefault();

      //Checks if input fields empty
      let hasError = true;

      for (let error in errors) {
        if (errors.hasOwnProperty(error)) {
          if (errors[error]) {
            hasError = true;
            break;
          } else {
            hasError = false;
          }
        };
      };
      
      if (!hasError) {
        props.handleSetPage("bank");        
      }
    }} >
      <label>
        <span>Amount</span>
        <input type="text" onChange={(e) => {
          const amount = e.target.value;

          if (amount.trim().length > 0) {
            props.handleAmountChange(amount);  
            setErrors({...errors, amount: false});          
          };
        }} />      
      </label>
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={(e) => {
          const phoneNumber = e.target.value;

          if (phoneNumber.trim().length > 0) {
            props.handlePhoneNumberChange(phoneNumber);  
            setErrors({...errors, phoneNumber: false});          
          };
        }} />      
      </label>       
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default AmountForm;
import React, { useState } from "react";
import './AmountForm.scss';

const AmountForm = (props) => {
  return (
  <div className="amount">
    <form className="form amount__form" onSubmit={(e) => {
      e.preventDefault();
      props.handleSetPage("bank");
    }} >
      <label>
        <span>Amount</span>
        <input type="text" onChange={(e) => {
          const amount = e.target.value;
          props.handleAmountChange(amount);
        }} />      
      </label>
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={(e) => {
          const phoneNumber = e.target.value;
          props.handlePhoneNumberChange(phoneNumber);
        }} />      
      </label>       
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default AmountForm;
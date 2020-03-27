import React, { useState } from "react";
import style from './InsurancePurchaseForm.module.scss';

const InsurancePurchaseForm = (props) => {
  const plans = ['Max', 'Bigi', 'Smallie', 'Family', 'Oga'];
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
  'August', 'September', 'October', 'November', 'December'];
  const years = ['2019', '2020', '2021', '2022', '2023', '2024', '2025'];
  const [error, setError] = useState("Please type values to begin");

  return (
  <div className={style.insurancePurchaseForm}>
    <form className={style.form} onSubmit={(e) => {
      e.preventDefault();
      if (error.trim().length === 0) {
        props.handleSetPage("summary");
      };
    }} >
      <label>
        <span>Name</span>
        <input type="text" onChange={(e) => {
          const name = e.target.value;

          if (name.trim().length > 0) {
            props.handleNameChange(name);
            setError("");
          } else {
           setError("Name field empty");            
          }
        }} />      
      </label>
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={(e) => {
          const phoneNumber = e.target.value;

          if (phoneNumber.trim().length > 0) {
            props.handlePhoneNumberChange(phoneNumber);
            setError("");
          } else {
            setError("PhoneNumber field empty");
          }
        }} />      
      </label>  
      <label>
        <span>Plan</span>
        <select onChange={(e) => {
          const plan = e.target.value;

          if (plan.trim().length > 0) {
            props.handlePlanChange(plan);
            setError("");
          } else {
            setError("Plan field empty");
          }
        }}>
          {plans.map((plan, index) => {
            return <option value={plan} key={index}>{plan}</option>
          })}
        </select>      
      </label>        
      <label>
        <span>Amount</span>
        <input type="text" onChange={(e) => {
          const amount = e.target.value;

          if (amount.trim().length > 0) {
            props.handleAmountChange(amount);
            setError("");
          } else {
            setError("Amount field empty");
          }
        }} />      
      </label> 
      <div>
        <label>
          <span>Month</span>
          <select onChange={(e) => {
            const month = e.target.value;

            if (month.trim().length > 0) {
              props.handleMonthChange(month);
              setError("");
            } else {
              setError("Month field empty");
            }
          }}>
            {months.map((month, index) => {
              return <option value={month} key={index}>{month}</option>
            })}
          </select>      
        </label>   
        <label>
          <span>Year</span>
          <select onChange={(e) => {
            const year = e.target.value;

            if (year.trim().length > 0) {
              props.handleYearChange(year);
              setError("");
            } else {
              setError("Year field empty");
            }
          }}>
            {years.map((year, index) => {
              return <option value={year} key={index}>{year}</option>
            })}
          </select>   
        </label>         
      </div>         
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default InsurancePurchaseForm;
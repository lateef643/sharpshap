import React, { useEffect, useState } from "react";
import axios from "axios";
import { GET_STARTIMES_PLANS } from "../../../../store/api/constants";
import { GET_DSTV_PLANS } from "../../../../store/api/constants";
import { GET_GOTV_PLANS } from "../../../../store/api/constants";
import { VALIDATE_STARTIMES_CUSTOMER } from "../../../../store/api/constants";
import { VALIDATE_MULTICHOICE_CUSTOMER } from "../../../../store/api/constants";
import VerificationLoader from "../../../partials/VerificationLoader";
import dstv from "../../../../assets/images/dstv.jpg";
import startimes from "../../../../assets/images/startimes.png";
import gotv from "../../../../assets/images/GOtv_Logo.png";
import styles from "./RechargeCableForm.module.scss";

export const RechargeCableForm = (props) => {
  const cableTvProviders = [{ name: "dstv" }, { name: 'gotv' }, {name: "startimes" }];
  const { plans, handleSmartCardNumberChange, validationError,
    handlePlanChange, handleProviderChange, handlePlanDurationChange, setCustomerName, setPlans,
    handlePhoneChange, setValidationError, handlePlanAmountChange, setComponentToRender, customerValidationLoading,
    setCustomerValidationLoading, getPlansLoading, setGetPlansLoading, provider, plan, smartCardNumber, amount, phone, planDuration, customerName, code } = props;
  useEffect(() => {
    let providerApi;

    if (provider) {
      setGetPlansLoading(true);

      if (provider === "dstv") {
        providerApi = GET_DSTV_PLANS;
      } else if (provider === "gotv") {
        providerApi = GET_GOTV_PLANS;
      } else if (provider === "startimes") {
        providerApi = GET_STARTIMES_PLANS;
      }
  
      axios.get(providerApi)
        .then(res => {
          const plans = res.data.data;
          setPlans(plans);
          setGetPlansLoading(false);
        })
        .catch(err => {
          setGetPlansLoading(false);
        })
    }
  }, [provider]);

  useEffect(() => {
    let providerApi;

    if (provider && smartCardNumber.length >= 10) {
      setCustomerValidationLoading(true);

      if (provider === "dstv" || provider === "gotv") {
        providerApi = VALIDATE_MULTICHOICE_CUSTOMER;
      } else if (provider === "startimes") {
        providerApi = VALIDATE_STARTIMES_CUSTOMER;
      }

      const payload = {
        smartcard: smartCardNumber,
        service: provider
      };

      axios.post(providerApi, payload)
        .then(res => {
          let name;

          name = provider === "startimes" ? res.data.data.customerName 
          : `${res.data.data.statusDescription.firstname} ${res.data.data.statusDescription.lastname}`

          setValidationError({ ...validationError, customerName: !name });
          setCustomerName(name);
          setCustomerValidationLoading(false);
        })
        .catch(err => {
          setValidationError({ ...validationError, customerName: !customerName });
          setCustomerValidationLoading(false);
        })
    }
  }, [provider, smartCardNumber]);

    //Dynamically render bank logo
    let providerImageUrl = "";

    providerImageUrl = provider === "gotv" ? gotv
    : provider === "dstv" ?  dstv : provider === "startimes" ? startimes
    : dstv;

  return (
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();

      if (smartCardNumber && amount && customerName && code && planDuration && provider) {
        setComponentToRender("summary");
      } else {
        setTimeout(() => {
          setValidationError({ ...validationError, provider: !provider, code: !code, smartCardNumber: !smartCardNumber, 
          planDuration: !planDuration, amount: !amount , phone: !phone });
        }, 2000);          
      }
    }} >
      <div className={styles.imageContainer}>
        <img className={styles.image} src={providerImageUrl} />
      </div>
      <label>
        <span>Provider</span>
        <select onChange={handleProviderChange} className={validationError.provider ? styles.outlineRed : styles.outlineGrey}>
        <option value="">Select Provider</option>
        {cableTvProviders.map((cable, index) => {
          return <option value={cable.name} key={index}>{cable.name}</option>
        })}
        </select>  
        {validationError.provider ? <p className={styles.validationErrorText}>Please select provider</p> : undefined}
      </label>  
      <label>
        <span>Packages</span>
        <select onChange={handlePlanChange} className={validationError.code ? styles.outlineRed : styles.outlineGrey}>
        <option value="">Select Plan</option>
        {plans.map((plan, index) => {
          return <option value={JSON.stringify(plan)} key={index}>{plan.name}</option>
        })}
        </select>
        {getPlansLoading ? <VerificationLoader /> : undefined}
        {validationError.code ? <p className={styles.validationErrorText}>Please select plan</p> : undefined}
      </label>
      <label>
        <span>Smart Card Number</span>
        <input type="text" onChange={handleSmartCardNumberChange} className={validationError.smartCardNumber ? styles.outlineRed : styles.outlineGrey}/>      
        {validationError.smartCardNumber ? <p className={styles.validationErrorText}>Please enter smart card number</p> : undefined}
      </label>
      <label>
        <span>Customer Name</span>
        <input type="text" value={customerName} disabled={true} className={styles.outlineGrey} /> 
        {customerValidationLoading ? <VerificationLoader /> : undefined}
        {validationError.customerName ? <p className={styles.validationErrorText}>Customer validation failed</p> : undefined}
      </label>  
      <label>
        <span>Phone Number</span>
        <input type="text" value={phone} onChange={handlePhoneChange} className={validationError.phone ? styles.outlineRed : styles.outlineGrey} /> 
        {validationError.phone ? <p className={styles.validationErrorText}>Please enter phone number</p> : undefined}
      </label> 
      <label>
        <span>Plan Duration</span>
        <select onChange={handlePlanDurationChange} className={validationError.planDuration ? styles.outlineRed : styles.outlineGrey}>
        <option value="">Select Duration</option>
        {plan.availablePricingOptions ? plan.availablePricingOptions.map((plan, index) => {
          return <option value={plan.monthsPaidFor} key={index}>{plan.monthsPaidFor} months</option>
        }) : undefined}
        </select>  
        {validationError.planDuration ? <p className={styles.validationErrorText}>Please select plan duration</p> : undefined}
      </label> 
      <label>
        <span>Amount</span>
        <input type="text" value={amount} onChange={handlePlanAmountChange} className={validationError.amount ? styles.outlineRed : styles.outlineGrey} />
        {validationError.amount ? <p className={styles.validationErrorText}>Please enter amount</p> : undefined}
      </label>          
      <button type="submit">Submit</button>
    </form>
  )
};

export default RechargeCableForm;
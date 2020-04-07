import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { GET_STARTIMES_PLANS } from "../../../../store/api/constants";
import { GET_DSTV_PLANS } from "../../../../store/api/constants";
import { GET_GOTV_PLANS } from "../../../../store/api/constants";
import { VALIDATE_STARTIMES_CUSTOMER } from "../../../../store/api/constants";
import { VALIDATE_MULTICHOICE_CUSTOMER } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import style from './RechargeCable.module.scss';

//three providers
//get plans
  //make post request with selected provider
//validate
  //validate customer with smartcardnumber
//vend
  //post request with complete information

export const RechargeCable = ({ changeCurrentPage }) => {
  const cableTvProviders = [{ name: "dstv" }, { name: 'gotv' }, {name: "startimes" }];
  const [plans, setPlans] = useState([]);
  const [provider, setProvider] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    let providerApi;

    if (provider === "dstv") {
      providerApi = GET_DSTV_PLANS;
    } else if (provider === "gotv") {
      providerApi = GET_GOTV_PLANS;
    } else if (provider === "startimes") {
      providerApi = GET_STARTIMES_PLANS;
    }

    axios.post(providerApi)
      .then(res => {
        const plans = res.data.data.plans;
        setPlans(plans);
      })
      .catch(err => {
        console.log(err);
      })
  }, [provider]);

  useEffect(() => {
    let providerApi;

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
        //outline red with some error text just above the input or somewhere else 
        //saying account information not found or outline green if validated
        //set validated to true if success or false if error
        //payment can only proceed if validated is true
      })
      .catch(err => {
        
      })
  }, [provider, smartCardNumber]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Recharge Cable",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log({
      provider,
      smartCardNumber,
      plan
    })

    axios.post()
    .then(res => {

    })
    .catch(err => {
      
    })
  };

  const handleProviderChange = (e) => {
    const newProviderCode = e.target.value;
    setProvider(newProviderCode);
  };

  const handleSmartCardNumberChange = (e) => {
    const newSmartCardNumber = e.target.value;
    setSmartCardNumber(newSmartCardNumber);
  };

  const handlePlanChange = (e) => {
    const newPlan = e.target.value;
    setPlan(newPlan);
  };

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit} >
      <label>
        <span>Provider</span>
        <select onChange={handleProviderChange}>
        <option>Select Provider</option>
        {cableTvProviders.map((cable, index) => {
          return <option value={cable.name} key={index}>{cable.name}</option>
        })}
        </select>      
      </label>
      <label>
        <span>Smart Card Number</span>
        <input type="text" onChange={handleSmartCardNumberChange} />      
      </label>    
      <label>
        <span>Packages</span>
        <select onChange={handlePlanChange}>
        <option>Select Plan</option>
        {plans.map((plan, index) => {
          return <option value={plan} key={index}>{plan}</option>
        })}
        </select>      
      </label> 
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(RechargeCable);
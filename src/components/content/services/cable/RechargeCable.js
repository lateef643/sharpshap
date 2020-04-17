import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { GET_STARTIMES_PLANS } from "../../../../store/api/constants";
import { GET_DSTV_PLANS } from "../../../../store/api/constants";
import { GET_GOTV_PLANS } from "../../../../store/api/constants";
import { VALIDATE_STARTIMES_CUSTOMER } from "../../../../store/api/constants";
import { VALIDATE_MULTICHOICE_CUSTOMER } from "../../../../store/api/constants";
import { VEND_STARTIMES } from "../../../../store/api/constants";
import { VEND_MULTICHOICE } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import RechargeCableStatus from "./RechargeCableStatus";
import Loader from "../../../partials/Loader";
import style from './RechargeCable.module.scss';

export const RechargeCable = ({ changeCurrentPage }) => {
  const cableTvProviders = [{ name: "dstv" }, { name: 'gotv' }, {name: "startimes" }];
  const [plans, setPlans] = useState([]);
  const [provider, setProvider] = useState("");
  const [smartCardNumber, setSmartCardNumber] = useState("");
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
  });
  const [planDuration, setPlanDuration] = useState("");
  const [amount, setAmount] = useState("");
  const [plan, setPlan] = useState({});
  const [code, setCode] = useState("");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [successPayload, setSuccessPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(false);

  useEffect(() => {
    let providerApi;

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
      })
      .catch(err => {
        console.log(err.response);
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

    if (smartCardNumber.length >= 10) {
      axios.post(providerApi, payload)
        .then(res => {
          let name;

          name = provider === "startimes" ? res.data.data.customerName 
          : `${res.data.data.statusDescription.firstname} ${res.data.data.statusDescription.lastname}`

          setCustomerInfo({
            name,
            status: true,
            message: ""
          });
        })
        .catch(err => {
          setCustomerInfo({
            status: false,
            message: "Customer validation failed",
            name: ""
          })
        })      
    }
  }, [provider, smartCardNumber]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Recharge Cable",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    let providerApi;

    if (provider === "dstv" || provider === "gotv") {
      providerApi = VEND_MULTICHOICE;
    } else if (provider === "startimes") {
      providerApi = VEND_STARTIMES;
    }
    
    const payload = {
      smartcard: smartCardNumber,
      amount,
      customer_name: "MOBILE",
      product_code: code,
      period: planDuration,
      service: provider      
    };

    if (smartCardNumber && amount && customerInfo.name && payload.customer_name 
      && code && planDuration && provider) {
        axios.post(providerApi, payload)
        .then(res => {
          const successMessage = res.data.data.statusDescription.message;
          setSuccess(successMessage);
          setLoading(false);
          setProvider("");
          setSmartCardNumber("");
          setPlanDuration("");
          setAmount("");  
          setPlan("");
          setCode("");
          setValidationError({});
          setSuccessPayload(res.data.data);
        })
        .catch(err => {
          if (err.response && err.response.status === 403) {
            const errorMessage = err.response.data.message;
            setError(errorMessage);
            setLoading(false);
          } else {
            setTimeout(() => {
              setLoading(false);
              setError('Transaction failed please try again later');
            }, 7000)
          }          
        })      
    } else {
      setTimeout(() => {
        setLoading(false);
        setValidationError({ ...validationError, provider: !provider, code: !code, smartCardNumber: !smartCardNumber, 
        planDuration: !planDuration, amount: !amount });
      }, 2000);          
    }
  };

  const handleProviderChange = (e) => {
    const newProviderCode = e.target.value;
    setValidationError({ ...validationError, provider: !newProviderCode  });
    setProvider(newProviderCode);
    
  };

  const handleSmartCardNumberChange = (e) => {
    const newSmartCardNumber = e.target.value;
    setValidationError({ ...validationError, smartCardNumber: !newSmartCardNumber  });
    setSmartCardNumber(newSmartCardNumber);
  };

  const handlePlanChange = (e) => {
    const newPlan = JSON.parse(e.target.value);
    setValidationError({ ...validationError, code: !newPlan.code  });
    setPlan(newPlan);
    setCode(newPlan.code);
  };

  const handlePlanDurationChange = (e) => {
    const newDuration = e.target.value;
    setValidationError({ ...validationError, planDuration: !planDuration });
    setPlanDuration(newDuration);
    handlePlanAmountChange(newDuration);
  };

  const handlePlanAmountChange = (duration) => {
    const selectedPlan = plan.availablePricingOptions.find(plan => {
      return plan.monthsPaidFor == duration;
    });

    const amount = selectedPlan.price;
    setValidationError({ ...validationError, amount: !amount });

    setAmount(amount);
  };

  return (
  <div className={style.container}>
    {transactionStatus ? 
    <RechargeCableStatus /> :
    <form className={style.form} onSubmit={handleOnSubmit} >
      {loading ? <p className={style.pending}>Please wait while we process your transaction...</p> : undefined}
      {error ? <p className={`${style.status} ${style.error}`}>{error}</p> : undefined}
      {success ? <p className={`${style.status} ${style.success}`}>{success}</p> : undefined}
      <label>
        <span>Provider</span>
        <select onChange={handleProviderChange} className={validationError.provider ? style.outlineRed : style.outlineGrey}>
        <option value="">Select Provider</option>
        {cableTvProviders.map((cable, index) => {
          return <option value={cable.name} key={index}>{cable.name}</option>
        })}
        </select>  
        {validationError.provider ? <p className={style.validationErrorText}>Please select provider</p> : undefined}
      </label>  
      <label>
        <span>Packages</span>
        <select onChange={handlePlanChange} className={validationError.code ? style.outlineRed : style.outlineGrey}>
        <option value="">Select Plan</option>
        {plans.map((plan, index) => {
          return <option value={JSON.stringify(plan)} key={index}>{plan.name}</option>
        })}
        </select>
        {validationError.code ? <p className={style.validationErrorText}>Please select plan</p> : undefined}
      </label>
      <label>
        <span>Smart Card Number</span>
        <input type="text" onChange={handleSmartCardNumberChange} className={validationError.smartCardNumber ? style.outlineRed : style.outlineGrey}/>      
        {validationError.smartCardNumber ? <p className={style.validationErrorText}>Please enter smart card number</p> : undefined}
      </label>
      <label>
        <span>Customer Name</span>
        <input type="text" value={customerInfo.name} disabled={true} /> 
        {!customerInfo.status && customerInfo.message ? <p className={style.validationErrorText}>Customer validation failed</p> : undefined}
      </label>  
      <label>
        <span>Plan Duration</span>
        <select onChange={handlePlanDurationChange} className={validationError.planDuration ? style.outlineRed : style.outlineGrey}>
        <option>Select Duration</option>
        {plan.availablePricingOptions ? plan.availablePricingOptions.map((plan, index) => {
          return <option value={plan.monthsPaidFor} key={index}>{plan.monthsPaidFor} months</option>
        }) : undefined}
        </select>  
        {validationError.planDuration ? <p className={style.validationErrorText}>Please select plan duration</p> : undefined}
      </label> 
      <label>
        <span>Amount</span>
        <input type="text" value={amount} onChange={handlePlanAmountChange} />      
      </label>  
      <button type="submit">{loading ?  
        <Loader size="small" color="white" position="center" /> : "Submit"}
      </button>
    </form>}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(RechargeCable);
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import SuccessfulTransaction from "../../../shared/SuccessfulTransaction";
import { GET_DATA_PLANS } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import { VEND_DATA } from "../../../../store/api/constants";
import style from './BuyData.module.scss';

const BuyData = ({ changeCurrentPage }) => {
  const telcoList = 
    [{code: "D01D", id: 5, name: "Airtel", type: "Data"},
    {code: "D02D", id: 6, name: "9 Mobile", type: "Data"},
    {code: "D03D", id: 7, name: "Globacom", type: "Data"},
    {code: "D04D", id: 8, name: "MTN", type: "Data"}];
    
  const [dataPlans, setDataPlans] = useState([]);
  const [telco, setTelco] = useState("");
  const [selectedDataPlanId, setSelectedDataPlanId] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [successPayload, setSuccessPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    const payload = {
      telco
    };

    axios.post(GET_DATA_PLANS, payload)
      .then(res => {
        console.log(res);
        const dataPlans = res.data.data;
        setDataPlans(dataPlans);
      })
      .catch(err => {
        console.log(err.response);
      })
  }, [telco]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Data",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const payload = {
      telco,
      amount,
      phone
    };

    if (telco && amount && phone) {
      axios.post(VEND_DATA, payload)
      .then(res => {
        const successPayload = res.data.data;

        setSuccessPayload(successPayload);
        setSuccess(true);
        setLoading(false);
        setPhone("");
        setSelectedDataPlanId("");
        setTelco("");
        setAmount("");      
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
        setValidationError({ ...validationError, telco: !telco, phone: !phone, selectedDataPlanId: !selectedDataPlanId });
      }, 2000);      
    }
  };

  const handleAmountChange = (planId) => {
    const selectedDataPlan = dataPlans.find(plan => {
      return plan.productId === planId;
    });

    if (Object.keys(selectedDataPlan).length > 0) {
      const amount = String(selectedDataPlan.amount);
      setAmount(amount);      
    }
  };

  const handleTelcoChange = (e) => {
    const newTelcoName = e.target.value;

    setError(undefined);
    setSuccess(undefined);
    setSuccessPayload(null);
    setValidationError({ ...validationError, telco: !newTelcoName  });
    setTelco(newTelcoName);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;

    setError(undefined);
    setSuccess(undefined);
    setSuccessPayload(null);
    setValidationError({ ...validationError, phone: !newPhone  });
    setPhone(newPhone);
  };

  const handleSelectedDataPlanIdChange = (e) => {
    const newSelectedDataPlanId= e.target.value;

    setError(undefined);
    setSuccess(undefined);
    setSuccessPayload(null);
    setValidationError({ ...validationError, selectedDataPlanId: !newSelectedDataPlanId  });
    setSelectedDataPlanId(newSelectedDataPlanId);
    handleAmountChange(newSelectedDataPlanId);
  };

  return (
  <div className={style.container}>
    {success ? <SuccessfulTransaction successPayload={successPayload} /> :
    <form className={style.form} onSubmit={handleOnSubmit} >
      {loading ? <p className={style.pending}>Please wait while we process your transaction...</p> : undefined}
      {error ? <p className={`${style.status} ${style.error}`}>{error}</p> : undefined}
      {success ? <p className={`${style.status} ${style.success}`}>{success}</p> : undefined}
      <label>
        <span>Network</span>
        <select onChange={handleTelcoChange} className={validationError.telco ? style.outlineRed : style.outlineGrey} >
          <option value="">Select Network</option>
          {telcoList.map((telco, index) => {
            return <option value={telco.code} key={index}>{telco.name}</option>
          })}
        </select>  
        {validationError.telco ? <p className={style.validationErrorText}>Please select network</p> : undefined}
      </label>
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneChange} className={validationError.phone ? style.outlineRed : style.outlineGrey} />   
        {validationError.phone ? <p className={style.validationErrorText}>Please enter phone number</p> : undefined}
      </label>    
      <label>
        <span>Data Plan</span>
        <select onChange={handleSelectedDataPlanIdChange} className={validationError.selectedDataPlanId ? style.outlineRed : style.outlineGrey} >
          <option value="">Select Data Plan</option>
          {dataPlans.map((plan, index) => {
            return <option value={plan.productId} key={index}>{plan.databundle}</option>
          })}
        </select> 
        {validationError.selectedDataPlanId ? <p className={style.validationErrorText}>Please select data plan</p> : undefined}
      </label> 
      <label>
        <span>Amount</span>
        <input type="text" disabled={true} value={amount} />
      </label>
      <button type="submit">{loading ?  
        <Loader size="small" color="white" position="center" /> : "Submit"}
      </button>
      </form>}  
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BuyData);
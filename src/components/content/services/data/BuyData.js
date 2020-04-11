import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
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
  const [dataPlan, setDataPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    const payload = {
      telco
    };

    axios.post(GET_DATA_PLANS, payload)
      .then(res => {
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
        const successMessage = res.data.data.statusDescription;
        setSuccess(successMessage);
        setLoading(false);
        setPhone("");
        setDataPlan("");
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
          }, 7000)
        }
      })      
    } else {
      setTimeout(() => {
        setLoading(false);
        setValidationError({ ...validationError, telco: !telco, phone: !phone, dataPlan: !dataPlan });
      }, 2000);      
    }
  };

  const handleAmountChange = (plan) => {
    const dataPlan = dataPlans.find(dataPlan => {
      return dataPlan.productId === plan;
    });

    const amount = String(dataPlan.amount);
    setAmount(amount);
  };

  const handleTelcoChange = (e) => {
    const newTelcoName = e.target.value;

    setError(undefined);
    setSuccess(undefined);
    setValidationError({ ...validationError, telco: !newTelcoName  });
    setTelco(newTelcoName);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;

    setError(undefined);
    setSuccess(undefined);
    setValidationError({ ...validationError, phone: !newPhone  });
    setPhone(newPhone);
  };

  const handleDataPlanChange = (e) => {
    const newDataPlan = e.target.value;

    setError(undefined);
    setSuccess(undefined);
    setValidationError({ ...validationError, dataPlan: !newDataPlan  });
    setDataPlan(newDataPlan);
    handleAmountChange(newDataPlan);
  };

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit} >
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
        <select onChange={handleDataPlanChange} className={validationError.dataPlan ? style.outlineRed : style.outlineGrey} >
          <option>Select Data Plan</option>
          {dataPlans.map((plan, index) => {
            return <option value={plan.productId} key={index}>{plan.databundle}</option>
          })}
        </select> 
        {validationError.dataPlan ? <p className={style.validationErrorText}>Please select data plan</p> : undefined}
      </label> 
      <label>
        <span>Amount</span>
        <input type="text" disabled={true} value={amount} />
      </label>
      <button type="submit">{loading ?  
        <Loader size="small" color="white" position="center" /> : "Submit"}
      </button>
    </form>    
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BuyData);
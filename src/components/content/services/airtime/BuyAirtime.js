import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import SuccessfulTransaction from "../../../shared/SuccessfulTransaction";
import { setCurrentPage } from "../../../../actions/page";
import { VEND_AIRTIME } from "../../../../store/api/constants";
import airtime from "../../../../assets/images/phone-svgrepo-com.svg";
import style from './BuyAirtime.module.scss';

export const BuyAirtime = ({ changeCurrentPage }) => {
  const telcoList = 
    [{code: "A01E", id: 1, name: "Airtel", type: "Airtime"},
    {code: "A02E", id: 2, name: "9 Mobile", type: "Airtime"},
    {code: "A03E", id: 3, name: "Globacom", type: "Airtime"},
    {code: "A04E", id: 4, name: "MTN", type: "Airtime"}];

  const [telco, setTelco] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(false);
  const [successPayload, setSuccessPayload] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Airtime",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = (e) => {
    e.preventDefault();
    setError(false);

    setLoading(true);
    
    const payload = {
      telco,
      amount,
      phone
    };

    if (telco && amount && phone) {
      axios.post(VEND_AIRTIME, payload)
      .then(res => {
        const successPayload = res.data.data;
        console.log(res.data.data)

        setSuccessPayload(successPayload);
        setSuccess(true);
        setLoading(false);
        setPhone("");
        setTelco("");
        setAmount("");
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          const errorMessage = err.response.data.message;
          setLoading(false);
          setError(errorMessage);     
        } else {
          setTimeout(() => {
            setLoading(false);
            setError('Transaction failed please try again later');
          }, 7000);
        }
      })
    } else {
      setTimeout(() => {
        setLoading(false);
        setValidationError({ ...validationError, telco: !telco, phone: !phone, amount: !amount });
      }, 2000);
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

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setError(undefined);
    setSuccess(undefined);
    setSuccessPayload(null);
    setValidationError({ ...validationError, amount: !newAmount  });
    setAmount(newAmount);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setError(undefined);
    setSuccess(undefined);
    setSuccessPayload(null);
    setValidationError({ ...validationError, phone: !newPhone  });
    setPhone(newPhone);
  };

  return (
  <div className={style.container}>
    {success ? <SuccessfulTransaction successPayload={successPayload} /> : 
    <form className={style.form} onSubmit={handleOnSubmit}>
      <div className={style.imageContainer}>
        <img src={airtime} className={style.image} />
      </div>
      <div className={style.inputContainer}>
        <label>
          <span>Network</span>
          <select onChange={handleTelcoChange} className={validationError.telco ? style.outlineRed : style.outlineGrey}>
            <option value="">Select Network</option>
            {telcoList.map((telco, index) => {
              return <option value={telco.code} key={index}>{telco.name}</option>
            })}
          </select>  
          {validationError.telco ? <p className={style.validationErrorText}>Please select network</p> : undefined}
        </label>
        <label>
          <span>Amount</span>
          <input type="number" onChange={handleAmountChange} className={validationError.amount ? style.outlineRed : style.outlineGrey} />   
          {validationError.amount ? <p className={style.validationErrorText}>Please enter amount</p> : undefined}
        </label>    
        <label>
          <span>Phone Number</span>
          <input type="text" onChange={handlePhoneChange} className={validationError.phone ? style.outlineRed : style.outlineGrey} />  
          {validationError.phone ? <p className={style.validationErrorText}>Please enter phone number</p> : undefined}
        </label>
      </div>
      
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

export default connect(undefined, mapDispatchToProps)(BuyAirtime);
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { GET_TELCOS } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import { VEND_AIRTIME } from "../../../../store/api/constants";
import style from './BuyAirtime.module.scss';

export const BuyAirtime = ({ changeCurrentPage }) => {
  const [telcoList, setTelcoList] = useState([]);
  const [telco, setTelco] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(undefined);
  const [success, setSuccess] = useState(undefined);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios.get(GET_TELCOS)
      .then(res => {
        const telcoList = res.data.data;
        const airtimeVendors = telcoList.filter(telco => {
          return telco.type === "Airtime";
        });

        setTelcoList(airtimeVendors);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Airtime",
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
    
    axios.post(VEND_AIRTIME, payload)
    .then(res => {
      const success = res.data.data.statusDescription;
      setSuccess(success);
      setLoading(false);
      setPhone("");
      setTelco("");
      setAmount("");
    })
    .catch(err => {
      if (err.response) {
        const error = err.response.data.message;
        setLoading(false);
        setError(error);        
      }
    })
  };

  const handleTelcoChange = (e) => {
    const newTelcoName = e.target.value;
    setError(undefined);
    setSuccess(undefined);
    setTelco(newTelcoName);
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setError(undefined);
    setSuccess(undefined);
    setAmount(Number(newAmount));
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setError(undefined);
    setSuccess(undefined);
    setPhone(newPhone);
  };

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit}>
      {error ? <p className={style.error}>{error}</p> : undefined}
      {success ? <p className={style.success}>{success}</p> : undefined}
      <label>
        <span>Network</span>
        <select onChange={handleTelcoChange}>
          <option>Select Network</option>
          {telcoList.map((telco, index) => {
            return <option value={telco.code} key={index}>{telco.name}</option>
          })}
        </select>      
      </label>
      <label>
        <span>Amount</span>
        <input type="text" onChange={handleAmountChange} />      
      </label>    
      <label>
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneChange} />      
      </label>  
      <button type="submit">{loading ?  
        <div className={style.swing}>
          <div className={style.swingDot}></div>
          <div className={style.swingDot}></div>
        </div> : "Submit"}
      </button>
    </form>    
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BuyAirtime);
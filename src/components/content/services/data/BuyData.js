import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { GET_TELCOS, GET_DATA_PLANS } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import { VEND_DATA } from "../../../../store/api/constants";
import style from './BuyData.module.scss';

const BuyData = ({ changeCurrentPage }) => {
  const [telcoList, setTelcoList] = useState([]);
  const [dataPlans, setDataPlans] = useState([]);
  const [telco, setTelco] = useState("");
  const [dataPlan, setDataPlan] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    axios.get(GET_TELCOS)
      .then(res => {
        const telcoList = res.data.data;
        const dataVendors = telcoList.filter(telco => {
          return telco.type === "Data";
        });

        setTelcoList(dataVendors);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

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
    console.log({
      telco,
      dataPlan,
      phone
    });

    // const payload = {
    //   telco,
    //   dataPlan,
    //   phone
    // };
    
    // axios.post(VEND_DATA, payload)
    // .then(res => {
      
    // })
    // .catch(err => {

    // })
  };

  const handleAmountChange = (plan) => {
    const dataPlan = dataPlans.find(dataPlan => {
      return dataPlan.productId === plan;
    });

    const amount = dataPlan.amount;
    setAmount(amount);
  };

  const handleTelcoChange = (e) => {
    const newTelcoName = e.target.value;
    setTelco(newTelcoName);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setPhone(newPhone);
  };

  const handleDataPlanChange = (e) => {
    const newDataPlan = e.target.value;
    setDataPlan(newDataPlan);
    handleAmountChange(newDataPlan);
  };

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={handleOnSubmit} >
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
        <span>Phone Number</span>
        <input type="text" onChange={handlePhoneChange} />      
      </label>    
      <label>
        <span>Data Plan</span>
        <select onChange={handleDataPlanChange}>
          <option>Select Data Plan</option>
          {dataPlans.map((plan, index) => {
            return <option value={plan.productId} key={index}>{plan.databundle}</option>
          })}
        </select>      
      </label> 
      <label>
        <span>Amount</span>
        <input type="text" disabled={true} value={amount} />
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

export default connect(undefined, mapDispatchToProps)(BuyData);
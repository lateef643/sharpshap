import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import BuyDataForm from "./BuyDataForm";
import BuyDataSummary from "./BuyDataSummary";
import BuyDataStatus from "./BuyDataStatus";
import Loader from "../../../partials/Loader";
import { GET_DATA_PLANS } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import { VEND_DATA } from "../../../../store/api/constants";
import data from "../../../../assets/images/smartphone-data.svg";
import style from './BuyData.module.scss';

const BuyData = ({ changeCurrentPage }) => {
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [dataPlans, setDataPlans] = useState([]);
  const [telco, setTelco] = useState("");
  const [telcoName, setTelcoName] = useState("");
  const [selectedDataPlanName, setSelectedDataPlanName] = useState("");
  const [selectedDataPlanValidity, setSelectedDataPlanValidity] = useState("");
  const [selectedDataPlanId, setSelectedDataPlanId] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Data",
      search: false
    });
  }, [changeCurrentPage]);

  const handleOnSubmit = () => {
    setLoading(true);

    const payload = {
      telco,
      amount,
      phone
    };

    if (telco && amount && phone) {
      axios.post(VEND_DATA, payload)
      .then(res => {
        const successData = res.data.data;
        setTransactionStatus(true);
        setSuccessData(successData);
        setComponentToRender("status");    
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          setTransactionStatus(false);
          setLoading(false);
          setComponentToRender("status");    
        } else {
          setTimeout(() => {
            setLoading(false);
            setTransactionStatus(false);
            setComponentToRender("status");    
          }, 7000)
        }
      })      
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
    const telco = JSON.parse(e.target.value);

    if (typeof telco !== "string") {
      const newTelcoName = telco.name;
      const newTelcoCode = telco.code;

      setValidationError({ ...validationError, telco: !newTelcoName  });
      setTelco(newTelcoCode);
      setTelcoName(newTelcoName);
    }
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;

    setValidationError({ ...validationError, phone: !newPhone  });
    setPhone(newPhone);
  };

  const handleSelectedDataPlanIdChange = (e) => {
    const plan = JSON.parse(e.target.value);

    if (typeof plan !== "string") {
      const newSelectedDataPlanId = plan.productId;

      setValidationError({ ...validationError, selectedDataPlanId: !newSelectedDataPlanId  });
      setSelectedDataPlanId(newSelectedDataPlanId);
      setSelectedDataPlanValidity(plan.validity);
      setSelectedDataPlanName(plan.databundle);
      handleAmountChange(newSelectedDataPlanId);      
    }
  };

  switch(componentToRender) {
    case "form":
      renderedComponent = <BuyDataForm 
        handleTelcoChange={handleTelcoChange}
        handlePhoneChange={handlePhoneChange}
        handleSelectedDataPlanIdChange={handleSelectedDataPlanIdChange}
        validationError={validationError}
        setValidationError={setValidationError}
        setComponentToRender={setComponentToRender}
        dataPlans={dataPlans}
        setDataPlans={setDataPlans}
        amount={amount}
        phone={phone}
        selectedDataPlanId={selectedDataPlanId}
        telco={telco}
      />;
      break;
    case "summary":
      renderedComponent = <BuyDataSummary 
        telcoName={telcoName}
        amount={amount}
        phone={phone}
        selectedDataPlanName={selectedDataPlanName}
        selectedDataPlanValidity={selectedDataPlanValidity}
        handleOnSubmit={handleOnSubmit}
        loading={loading}
      />;
      break;
    case "status":
      renderedComponent = <BuyDataStatus 
        successData={successData}
        transactionStatus={transactionStatus}
      />;
      break;
    default:
      renderedComponent = null;
  }

  return (
  <div className={style.container}>
    {renderedComponent} 
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BuyData);
import React, { useEffect, useState } from "react";
import axios from "axios";
import { connect } from "react-redux";
import BuyAirtimeForm from "./BuyAirtimeForm";
import BuyAirtimeSummary from "./BuyAirtimeSummary";
import BuyAirtimeStatus from "./BuyAirtimeStatus";
import Loader from "../../../partials/Loader";
import { setCurrentPage } from "../../../../actions/page";
import { VEND_AIRTIME } from "../../../../store/api/constants";
import style from './BuyAirtime.module.scss';

export const BuyAirtime = ({ changeCurrentPage }) => {
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [telco, setTelco] = useState("");
  const [telcoName, setTelcoName] = useState("");
  const [amount, setAmount] = useState("");
  const [phone, setPhone] = useState("");
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [validationError, setValidationError] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Airtime",
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
      axios.post(VEND_AIRTIME, payload)
      .then(res => {
        const successData = res.data.data;
        setLoading(false);
        setTransactionStatus(true);
        setSuccessData(successData);
        setComponentToRender("status");
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          const errorMessage = err.response.data.message;
          setTransactionStatus(false);
          setLoading(false);
          setComponentToRender("status");
        } else {
          setTimeout(() => {
            setTransactionStatus(false);
            setLoading(false);
            setComponentToRender("status");
          }, 7000);
        }
      })
    }
  };

  const handleTelcoChange = (e) => {
    const telco = JSON.parse(e.target.value);

    if (typeof telco !== "string" ) {
      const telcoCode = telco.code;
      const telcoName = telco.name;

      setValidationError({ ...validationError, telco: !telcoCode  });
      setTelco(telcoCode);  
      setTelcoName(telcoName);
    } else {
      setTelco(telco);
    }
  };

  const handleAmountChange = (e) => {
    const newAmount = e.target.value;
    setValidationError({ ...validationError, amount: !newAmount  });
    setAmount(newAmount);
  };

  const handlePhoneChange = (e) => {
    const newPhone = e.target.value;
    setValidationError({ ...validationError, phone: !newPhone  });
    setPhone(newPhone);
  };

  switch(componentToRender) {
    case "form":
      renderedComponent = <BuyAirtimeForm 
        handleTelcoChange={handleTelcoChange}
        handleAmountChange={handleAmountChange}
        handlePhoneChange={handlePhoneChange}
        validationError={validationError}
        setValidationError={setValidationError}
        setComponentToRender={setComponentToRender}
        amount={amount}
        phone={phone}
        telco={telco}
        telcoName={telcoName}
      />;
      break;
    case "summary":
      renderedComponent = <BuyAirtimeSummary 
        amount={amount}
        phone={phone}
        telcoName={telcoName}
        handleOnSubmit={handleOnSubmit}
        loading={loading}
      />;
      break;
    case "status":
      renderedComponent = <BuyAirtimeStatus 
        transactionStatus={transactionStatus}
        successData={successData}
        setComponentToRender={setComponentToRender}
      />;
      break;
    default:
      renderedComponent = null;
      break;
  }

  return (
  <div className={style.container}>
    {renderedComponent}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BuyAirtime);
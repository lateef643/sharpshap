import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";

import ElectricityPaymentForm from "./ElectricityPaymentForm";
import ElectricityPaymentSummary from "./ElectricityPaymentSummary";
import ElectricityPaymentCompleted from "./ElectricityPaymentCompleted";
import FailedTransaction from "../../../shared/FailedTransaction";
import ElecticityPaymentReducer, { initialFormState } from "./payment-reducer";
import { setCurrentPage } from "../../../../actions/page";

import style from './ElectricityPayment.module.scss';

export const ElectricityPayment = ({ changeCurrentPage }) => {
  const TRANSACTION_COST = 0;
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState('form');
  const [ElectricityPaymentFormState, dispatch] = useReducer(ElecticityPaymentReducer, initialFormState);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Pay Electricity Bill",
      search: false
    });
  }, []);

  const handleOnSubmit = (e) => {
    setLoading(true);
    e.preventDefault();
    console.log(ElectricityPaymentFormState);
  };

  switch(componentToRender) {
    case 'form':
      renderedComponent = 
        <ElectricityPaymentForm 
          setComponentToRender={setComponentToRender}
          dispatch={dispatch}
          ElectricityPaymentFormState={ElectricityPaymentFormState}
        />
        break;
    case "summary":
      renderedComponent = 
        <ElectricityPaymentSummary 
          ElectricityPaymentFormState={ElectricityPaymentFormState}
          handleOnSubmit={handleOnSubmit}
          loading={loading}
          transactionCost={TRANSACTION_COST}
        />
        break;
    case "success":
      renderedComponent = 
        <ElectricityPaymentCompleted />
        break;
    case "failed":
      renderedComponent = 
        <FailedTransaction />
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

export default connect(undefined, mapDispatchToProps)(ElectricityPayment);
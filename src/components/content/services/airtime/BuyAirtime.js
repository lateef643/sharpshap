import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { connect } from "react-redux";

import { setCurrentPage } from "../../../../actions/page";
import { VEND_AIRTIME } from "../../../../store/api/constants";
import AirtimePurchaseReducer, { initialState } from "./airtime-reducer";
import BuyAirtimeForm from "./BuyAirtimeForm";
import BuyAirtimeSummary from "./BuyAirtimeSummary";
import BuyAirtimeStatus from "./BuyAirtimeStatus";
import FailedTransaction from "../../../shared/FailedTransaction";

import styles from './BuyAirtime.module.scss';

export const BuyAirtime = ({ changeCurrentPage }) => {
  let renderedComponent;
  const TRANSACTION_COST = 0;
  const [componentToRender, setComponentToRender] = useState("form");
  const [AirtimePurchaseFormState, dispatch] = useReducer(AirtimePurchaseReducer, initialState);
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const networkList = 
    [{code: "A01E", id: 1, name: "Airtel", type: "Airtime"},
    {code: "A02E", id: 2, name: "9 Mobile", type: "Airtime"},
    {code: "A03E", id: 3, name: "Globacom", type: "Airtime"},
    {code: "A04E", id: 4, name: "MTN", type: "Airtime"}];
  const [selectedNetworkName, setSelectedNetworkName] = useState("");

  useEffect(() => {
    changeCurrentPage({
      heading: "Buy Airtime",
      search: false
    });
  }, []);

  useEffect(() => {
    if (AirtimePurchaseFormState.network) {
      const selectedNetwork = networkList.find(telco => {
        return telco.code === AirtimePurchaseFormState.network;
      });

      setSelectedNetworkName(selectedNetwork.name);
    }
  }, [AirtimePurchaseFormState.network]);

  const handleOnSubmit = () => {
    const { network: telco, amount, phone } = AirtimePurchaseFormState;
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
        setSuccessData(successData);
        setComponentToRender("success");
      })
      .catch(err => {
        if (err.response && err.response.status === 403) {
          setLoading(false);
          setComponentToRender("failed");
        } else {
          setTimeout(() => {
            setLoading(false);
            setComponentToRender("failed");
          }, 7000);
        }
      })
    }
  };

  switch(componentToRender) {
    case "form":
      renderedComponent = 
      <BuyAirtimeForm 
        networkList={networkList}
        AirtimePurchaseFormState={AirtimePurchaseFormState}
        dispatch={dispatch}
        setComponentToRender={setComponentToRender}
      />;
      break;
    case "summary":
      renderedComponent = 
      <BuyAirtimeSummary 
        AirtimePurchaseFormState={AirtimePurchaseFormState}
        selectedNetworkName={selectedNetworkName}
        handleOnSubmit={handleOnSubmit}
        loading={loading}
        transactionCost={TRANSACTION_COST}
      />;
      break;
    case "success":
      renderedComponent = <BuyAirtimeStatus 
        successData={successData}
        setComponentToRender={setComponentToRender}
      />;
      break;
    case "failed":
      renderedComponent = <FailedTransaction />;
      break;
    default:
      renderedComponent = null;
      break;
  }

  return (
  <div className={styles.container}>
    {renderedComponent}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(BuyAirtime);
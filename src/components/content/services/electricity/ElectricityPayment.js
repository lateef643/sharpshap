import React, { useState, useEffect, useReducer } from "react";
import { connect } from "react-redux";
import axios from "axios";

import { VEND_ENERGY } from "../../../../store/api/constants";
import { setCurrentPage } from "../../../../actions/page";
import ElectricityPaymentForm from "./ElectricityPaymentForm";
import ElectricityPaymentSummary from "./ElectricityPaymentSummary";
import ElectricityPaymentCompleted from "./ElectricityPaymentCompleted";
import FailedTransaction from "../../../shared/FailedTransaction";
import ElecticityPaymentReducer, { initialFormState } from "./payment-reducer";

import style from "./ElectricityPayment.module.scss";

export const ElectricityPayment = ({ changeCurrentPage }) => {
  const TRANSACTION_COST = 0;
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [ElectricityPaymentFormState, dispatch] = useReducer(
    ElecticityPaymentReducer,
    initialFormState
  );
  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [agentLocation, setAgentLocation] = useState(null);

  useEffect(() => {
    changeCurrentPage({
      heading: "Pay Electricity Bill",
      search: false,
    });
  }, []);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function (position) {
        setAgentLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);

  const handleOnSubmit = () => {
    const {
      meterNo,
      disco,
      paymentPlan,
      amount,
      phone,
    } = ElectricityPaymentFormState;
    setLoading(true);

    const req = {
      meter_number: meterNo,
      disco: disco,
      type: paymentPlan,
      amount: parseInt(amount),
      phone: phone,
    };

    (async function vendEnergy() {
      try {
        const options = {
          headers: {
            lat: agentLocation?.latitude,
            lng: agentLocation?.longitude,
          },
        };

        const res = await axios.post(VEND_ENERGY, req, options);
        setLoading(false);
        setSuccessData(res.data.data);
        setComponentToRender("success");
      } catch (e) {
        setLoading(false);
        setComponentToRender("failed");
      }
    })();
  };

  switch (componentToRender) {
    case "form":
      renderedComponent = (
        <ElectricityPaymentForm
          setComponentToRender={setComponentToRender}
          dispatch={dispatch}
          ElectricityPaymentFormState={ElectricityPaymentFormState}
        />
      );
      break;
    case "summary":
      renderedComponent = (
        <ElectricityPaymentSummary
          ElectricityPaymentFormState={ElectricityPaymentFormState}
          handleOnSubmit={handleOnSubmit}
          loading={loading}
          transactionCost={TRANSACTION_COST}
        />
      );
      break;
    case "success":
      renderedComponent = (
        <ElectricityPaymentCompleted
          successData={successData}
          ElectricityPaymentFormState={ElectricityPaymentFormState}
        />
      );
      break;
    case "failed":
      renderedComponent = <FailedTransaction />;
      break;
    default:
      renderedComponent = null;
  }

  return <div className={style.container}>{renderedComponent}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(ElectricityPayment);

import React, { useState, useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import RechargeCableReducer, { initialFormState } from "./cable-reducer";
import { setCurrentPage } from "../../../actions/page";
import { VEND_STARTIMES, VEND_MULTICHOICE } from "../../../utils/constants";
import RechargeCableForm from "./RechargeCableForm";
import RechargeCableStatus from "./RechargeCableStatus";
import RechargeCableSummary from "./RechargeCableSummary";
import FailedTransaction from "../../../components/common/FailedTransaction";

export const RechargeCable = ({ service }) => {
  const TRANSACTION_COST = 0;
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [RechargeCableFormState, dispatch] = useReducer(
    RechargeCableReducer,
    initialFormState
  );
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);

  const getTransactionDate = (date) => {
    const dateString = date.toLocaleDateString();
    return dateString.slice(0, 24);
  };

  const handleOnSubmit = () => {
    setLoading(true);

    let providerApi;
    let payload;
    const {
      smartCardNumber,
      amount,
      selectedPlanCode,
      cycle,
      phone,
    } = RechargeCableFormState;

    if (service === "dstv" || service === "gotv") {
      providerApi = VEND_MULTICHOICE;
      payload = {
        smartcard: smartCardNumber,
        amount,
        phone,
        code: selectedPlanCode,
        type: service,
      };
    } else if (service === "startimes") {
      providerApi = VEND_STARTIMES;
      payload = {
        phone,
        code: selectedPlanCode,
        cycle,
        amount: amount,
        smartcard: smartCardNumber,
      };
    }

    (async function vendCable() {
      try {
        const res = await axios.post(providerApi, payload);
        const successData = res.data.data;
        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setLoading(false);
        setSuccessData({ ...successData, date: transactionDate });
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
        <RechargeCableForm
          service={service}
          RechargeCableFormState={RechargeCableFormState}
          setFormState={dispatch}
          setComponentToRender={setComponentToRender}
        />
      );
      break;
    case "summary":
      renderedComponent = (
        <RechargeCableSummary
          RechargeCableFormState={RechargeCableFormState}
          loading={loading}
          handleOnSubmit={handleOnSubmit}
          transactionCost={TRANSACTION_COST}
          service={service}
          setComponentToRender={setComponentToRender}
        />
      );
      break;
    case "success":
      renderedComponent = (
        <RechargeCableStatus
          successData={successData}
          formState={RechargeCableFormState}
          setComponentToRender={setComponentToRender}
          transactionCost={TRANSACTION_COST}
          service={service}
        />
      );
      break;
    case "failed":
      renderedComponent = <FailedTransaction />;
      break;
    default:
      renderedComponent = null;
  }

  return <>{renderedComponent}</>;
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

RechargeCable.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(RechargeCable);

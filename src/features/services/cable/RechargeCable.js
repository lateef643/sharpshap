import React, { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import RechargeCableReducer, { initialFormState } from "./cable-reducer";
import { setCurrentPage } from "../../../actions/page";
import { VEND_STARTIMES } from "../../../store/api/constants";
import { VEND_MULTICHOICE } from "../../../store/api/constants";
import RechargeCableForm from "./RechargeCableForm";
import RechargeCableStatus from "./RechargeCableStatus";
import RechargeCableSummary from "./RechargeCableSummary";
import FailedTransaction from "../../../components/shared/FailedTransaction";

import styles from "./RechargeCable.module.scss";

export const RechargeCable = ({ changeCurrentPage }) => {
  const TRANSACTION_COST = 0;
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [RechargeCableFormState, dispatch] = useReducer(
    RechargeCableReducer,
    initialFormState
  );
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    changeCurrentPage({
      heading: "Recharge Cable",
      search: false,
    });
  }, []);

  const getTransactionDate = (date) => {
    const dateString = date.toString();
    // const index = dateString.search("GMT");
    return dateString.slice(0, 24);
  };

  const handleOnSubmit = () => {
    setLoading(true);

    let providerApi;
    const {
      provider,
      smartCardNumber,
      amount,
      selectedPlanCode,
      selectedplanDuration,
    } = RechargeCableFormState;

    if (provider === "dstv" || provider === "gotv") {
      providerApi = VEND_MULTICHOICE;
    } else if (provider === "startimes") {
      providerApi = VEND_STARTIMES;
    }

    const payload = {
      smartcard: smartCardNumber,
      amount,
      customer_name: "MOBILE",
      product_code: selectedPlanCode,
      period: selectedplanDuration,
      service: provider,
    };

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
          RechargeCableFormState={RechargeCableFormState}
          dispatch={dispatch}
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
        />
      );
      break;
    case "success":
      renderedComponent = (
        <RechargeCableStatus
          successData={successData}
          setComponentToRender={setComponentToRender}
          transactionCost={TRANSACTION_COST}
        />
      );
      break;
    case "failed":
      renderedComponent = <FailedTransaction />;
      break;
    default:
      renderedComponent = null;
  }

  return <div className={styles.container}>{renderedComponent}</div>;
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

RechargeCable.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(RechargeCable);

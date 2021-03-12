import React, { useEffect, useState, useReducer } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import axios from "axios";

import FundsTransferReducer, { initialFormState } from "./transfer-reducer";
import { setCurrentPage } from "../../../actions/page";
import { DISBURSE_FUNDS } from "../../../utils/constants";
import FundsTransferForm from "./FundsTransferForm";
import FundsTransferCompleted from "./FundsTransferCompleted";
import FundsTransferSummary from "./FundsTransferSummary";
import FailedTransaction from "../../../components/common/FailedTransaction";

import styles from "./index.module.scss";

export const FundsTransfer = ({ changeCurrentPage }) => {
  const TRANSACTION_COST = 35;
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [FundsTransferFormState, dispatch] = useReducer(
    FundsTransferReducer,
    initialFormState
  );
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [agentLocation, setAgentLocation] = useState(null);
  const [failedErrorMessage, setFailedErrorMessage] = useState("");

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

  useEffect(() => {
    changeCurrentPage({
      heading: "Funds Transfer",
      search: false,
    });
  }, []);

  const getTransactionDate = (date) => {
    const dateString = date.toString();
    return dateString.slice(0, 24);
  };

  const handleOnSubmit = () => {
    setLoading(true);

    const {
      accountNumber,
      beneficiaryBankCode,
      amount,
      phone,
    } = FundsTransferFormState;

    const req = {
      account_number: accountNumber,
      bank: beneficiaryBankCode,
      amount: amount,
      phone: phone,
    };

    (async function disburseFunds() {
      try {
        const options = {
          headers: {
            lat: agentLocation?.latitude,
            lng: agentLocation?.longitude,
          },
        };

        const res = await axios.post(DISBURSE_FUNDS, req, options);
        const reference = res.data?.data?.Data?.TxnId;
        const status = res.data.status;
        const message = res.data.message;
        const date = new Date();
        const transactionDate = getTransactionDate(date);

        setSuccessData({
          message,
          reference,
          status,
          transactionCost: TRANSACTION_COST,
          date: transactionDate,
        });
        setLoading(false);
        setComponentToRender("completed");
      } catch (err) {
        if (err.response && err.response.status === 403) {
          setLoading(false);
          setFailedErrorMessage(err.response?.message || undefined);
          setComponentToRender("failed");
        } else {
          setTimeout(() => {
            setLoading(false);
            setFailedErrorMessage(err.response?.message || undefined);
            setComponentToRender("failed");
          }, 7000);
        }
      }
    })();
  };

  switch (componentToRender) {
    case "form":
      renderedComponent = (
        <FundsTransferForm
          FundsTransferFormState={FundsTransferFormState}
          dispatch={dispatch}
          setComponentToRender={setComponentToRender}
          transactionCost={TRANSACTION_COST}
        />
      );
      break;
    case "summary":
      renderedComponent = (
        <FundsTransferSummary
          FundsTransferFormState={FundsTransferFormState}
          loading={loading}
          handleOnSubmit={handleOnSubmit}
          transactionCost={TRANSACTION_COST}
          setComponentToRender={setComponentToRender}
        />
      );
      break;
    case "completed":
      renderedComponent = (
        <FundsTransferCompleted
          successData={successData}
          setComponentToRender={setComponentToRender}
          FundsTransferFormState={FundsTransferFormState}
        />
      );
      break;
    case "failed":
      renderedComponent = <FailedTransaction message={failedErrorMessage} />;
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

FundsTransfer.propTypes = {
  changeCurrentPage: PropTypes.func.isRequired,
};

export default connect(undefined, mapDispatchToProps)(FundsTransfer);

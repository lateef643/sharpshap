import React, { useState, useReducer } from "react";
import axios from "axios";
import { useToasts } from "react-toast-notifications";

import {
  FUND_BETTING_WALLET,
  FUND_BETTING_WALLET_CLOUDBET,
} from "../../../../utils/constants";
import FundWalletReducer, { initialFormState } from "./wallet-reducer.js";
import FundWalletForm from "./FundWalletForm";
import FundWalletSummary from "./FundWalletSummary";
import FundWalletCompleted from "./FundWalletCompleted";
import FailedTransaction from "../../../../components/common/FailedTransaction";

import styles from "./FundWallet.module.scss";

export const FundWallet = () => {
  let renderedComponent;
  const TRANSACTION_COST = 0;
  const [componentToRender, setComponentToRender] = useState("form");
  const [FundWalletFormState, dispatch] = useReducer(
    FundWalletReducer,
    initialFormState
  );
  const [successData, setSuccessData] = useState(null);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToasts();

  const strings = window.location.href.split("/");
  const service = strings[4];

  const handleOnSubmit = () => {
    setLoading(true);
    const { accountId, amount } = FundWalletFormState;
    let recipient;
    let payload;
    let requestUrl;

    if (accountId.indexOf("234") === 0) recipient = accountId;
    if (accountId.indexOf("0") === 0)
      recipient = `234${accountId.substring(1)}`;
    if (accountId.indexOf("0") !== 0 && accountId.indexOf("234") !== 0)
      recipient = `234${accountId}`;

    if (service === "cloudbet") {
      payload = {
        amount,
        bank_code: "9001",
        recipient,
      };
      requestUrl = FUND_BETTING_WALLET_CLOUDBET;
    } else {
      payload = {
        amount,
        provider: service,
        customer_id: accountId,
      };
      requestUrl = FUND_BETTING_WALLET;
    }

    (async function fundWallet() {
      try {
        const res = await axios.post(requestUrl, payload);
        setLoading(false);
        setSuccessData(res.data.data);
        setComponentToRender("success");
      } catch (e) {
        addToast(e.response.data.message, {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
        setComponentToRender("failed");
      }
    })();
  };

  switch (componentToRender) {
    case "form":
      renderedComponent = (
        <FundWalletForm
          FundWalletFormState={FundWalletFormState}
          dispatch={dispatch}
          setComponentToRender={setComponentToRender}
          service={service}
        />
      );
      break;
    case "summary":
      renderedComponent = (
        <FundWalletSummary
          FundWalletFormState={FundWalletFormState}
          loading={loading}
          handleOnSubmit={handleOnSubmit}
          transactionCost={TRANSACTION_COST}
          service={service}
        />
      );
      break;
    case "success":
      renderedComponent = (
        <FundWalletCompleted
          FundWalletFormState={FundWalletFormState}
          transactionCost={TRANSACTION_COST}
          setComponentToRender={setComponentToRender}
          successData={successData}
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

  return <div className={styles.container}>{renderedComponent}</div>;
};

export default FundWallet;

import React, { useEffect, useState } from "react";
import axios from "axios";
import { WALLET_TRANSFER } from "../../../../store/api/constants";
import WalletTransferForm from "./WalletTransferForm";
import WalletTransferStatus from "./WalletTransferStatus";
import WalletTransferSummary from "./WalletTransferSummary";
import styles from "./WalletTransfer.module.scss";

export const WalletTransfer = () => {
  const TRANSACTION_COST = 35;
  let renderedComponent;
  const [componentToRender, setComponentToRender] = useState("form");
  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [successData, setSuccessData] = useState({});
  const [loading, setLoading] = useState(false);

  const getTransactionDate = (date) => {
    const dateString = date.toString();
    const index = dateString.search("GMT");
    return dateString.slice(0, 24);
  };

  const handleOnAgentIdChange = (e) => {
    const agentId = e.target.value;
    setAgentId(agentId);
  };

  const handleOnAmountChange = (e) => {
    const amount = e.target.value;

    if (amount.match(/^\d*(\.\d{0,2})?$/)) {
      setAmount(amount);
      setTotal(parseInt(amount) + TRANSACTION_COST);
    }
  };

  const handleOnSubmit = () => {
    setLoading(true);

    const Data = {
      agent_id: agentId,
      amount: amount
    };

    axios.post(WALLET_TRANSFER, Data)
      .then(res => {
        const successData = res.data.data;
        const date = new Date();
        const transactionDate = getTransactionDate(date);
       
        setSuccessData({...successData, date: transactionDate });
        setTransactionStatus(true);
        setLoading(false); 
        setComponentToRender("status");     
      })
      .catch(err => {
        console.log(err);
        setTransactionStatus(false);
        setLoading(false);
        setComponentToRender("status");
      })
  };

  switch(componentToRender) {
    case "form":
      renderedComponent = <WalletTransferForm 
        handleOnAgentIdChange={handleOnAgentIdChange}
        handleOnAmountChange={handleOnAmountChange}
        agentId={agentId}
        agentName={agentName}
        amount={amount}
        setComponentToRender={setComponentToRender}
      />;
      break;
    case "summary":
      renderedComponent = <WalletTransferSummary
        agentId={agentId}
        agentName={agentName}
        amount={amount}
        transactionCost={TRANSACTION_COST} 
        total={total}
        handleOnSubmit={handleOnSubmit}
        loading={loading} 
      />;
      break;
    case "status":
      renderedComponent = <WalletTransferStatus        
        transactionStatus={transactionStatus} 
        successData={successData} 
        setComponentToRender={setComponentToRender}
      />;
        break;
    default:
      renderedComponent = null; 
      break;
  };

  return (
    <div className={styles.container}>
      {renderedComponent}
    </div>
  )
}

export default WalletTransfer;
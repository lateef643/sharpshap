import React, { useEffect, useState } from "react";
import axios from "axios";
import WalletTransferStatus from "./WalletTransferStatus";
import WalletTransferSummary from "./WalletTransferSummary";
import styles from "./WalletTransfer.module.scss";

export const WalletTransfer = () => {
  const [walletId, setWalletId] = useState("");
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [summaryPayload, setSummaryPayload] = useState({});
  const [successPayload, setSuccessPayload] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const payload = {
      walletId,
      amount
    }

    axios.post('', payload)
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        console.log(err);
      })
  });

  const handleOnWalletIdChange = (e) => {
    const walletId = e.target.value;
    setWalletId(walletId);
  };

  const handleOnAgentIdChange = (e) => {
    const agentId = e.target.value;
    setAgentId(agentId);
  };

  const handleOnAmountChange = (e) => {
    const amount = e.target.value;
    setAmount(amount);
  };

  const handleOnSubmit = () => {
    setLoading(true);

    const payload = {
      walletId,
      agentId,
      amount
    };

    axios.post("", payload)
      .then(res => {
        console.log(res);
        transactionStatus("");
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        transactionStatus("");
        setLoading(false);
      })
  }

  const handleOnContinue = (e) => {
    e.preventDefault();
    setTransactionStatus("confirmation");
  };

  return (
    <div className={styles.container}>
      {transactionStatus === "confirmation" ? 
      <WalletTransferSummary 
      summary={summaryPayload}
      handleOnSubmit={handleOnSubmit}
      loading={loading} /> :

      transactionStatus === "finished" ? 
      <WalletTransferStatus 
        transactionStatus={transactionStatus} 
        successPayload={successPayload} /> :

      <form className={styles.form} onSubmit={handleOnContinue}>
        <label>
          <span>Wallet ID</span>
          <input type="text" onChange={handleOnWalletIdChange} />
        </label>
        <label>
          <span>Agent ID</span>
          <input type="text" onChange={handleOnAgentIdChange} />
        </label>
        <label>
          <span>Amount</span>
          <input type="text" onChange={handleOnAmountChange} />
        </label>
        <button>Submit</button>
      </form>}
    </div>
  )
}

export default WalletTransfer;
import React, { useEffect, useState } from "react";
import axios from "axios";
import { WALLET_TRANSFER } from "../../../../store/api/constants";
import WalletTransferStatus from "./WalletTransferStatus";
import WalletTransferSummary from "./WalletTransferSummary";
import wallet from "../../../../assets/images/wallet-svgrepo-com.svg";
import styles from "./WalletTransfer.module.scss";

export const WalletTransfer = () => {
  const TRANSACTION_COST = 0;
  const [agentName, setAgentName] = useState("");
  const [agentId, setAgentId] = useState("");
  const [amount, setAmount] = useState("");
  const [total, setTotal] = useState(null);
  const [page, setPage] = useState("");
  const [transactionStatus, setTransactionStatus] = useState("");
  const [summaryData, setSummaryData] = useState({});
  const [successPayload, setSuccessPayload] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setSummaryData({
      agentId,
      amount,
      agentName,
      TRANSACTION_COST,
      total
    })
  }, [agentId, amount, agentName, total]);

  // useEffect(() => {
  //   const payload = {
  //     agentId,
  //     amount
  //   };

  //   axios.post('', payload)
  //     .then(res => {
  //       console.log(res);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // });

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

    const payload = {
      agent_id: agentId,
      amount: total
    };

    axios.post(WALLET_TRANSFER, payload)
      .then(res => {
        console.log(res)
        const successData = res.data.data;
        setSuccessPayload(successData);
        transactionStatus(true);
        setLoading(false); 
        setPage("finished");     
      })
      .catch(err => {
        setTransactionStatus(false);
        setLoading(false);
        setPage("finished");
      })
  };

  const handleOnContinue = (e) => {
    e.preventDefault();
    setPage("confirmation");
  };

  return (
    <div className={styles.container}>
      {page === "confirmation" ? 
      <WalletTransferSummary 
      summaryData={summaryData}
      handleOnSubmit={handleOnSubmit}
      loading={loading} /> :

      page === "finished" ? 
      <WalletTransferStatus 
        transactionStatus={transactionStatus} 
        successPayload={successPayload} /> :

      <form className={styles.form} onSubmit={handleOnContinue}>
        <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} />
        </div>
        <div className={styles.inputContainer}>
          <label>
            <span>Agent ID</span>
            <input type="text" value={agentId} onChange={handleOnAgentIdChange} />
          </label>
          <label>
            <span>Agent Name</span>
            <input type="text" value={agentName} disabled={true} />
          </label>
          <label>
            <span>Amount</span>
            <input type="text" value={amount} onChange={handleOnAmountChange} />
          </label>
        </div>
        <button>Submit</button>
      </form>}
    </div>
  )
}

export default WalletTransfer;
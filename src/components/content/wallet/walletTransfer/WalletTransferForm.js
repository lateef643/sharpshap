import React, { useEffect } from "react";
import wallet from "../../../../assets/images/wallet-svgrepo-com.svg";
import styles from "./WalletTransferForm.module.scss";

export const WalletTransferForm = (props) => {
  const {handleOnAgentIdChange, handleOnAmountChange, 
  setAgentName, agentId, agentName, amount, setComponentToRender } = props;

  // useEffect(() => {
  //   const data = {
  //     agentId,
  //     amount
  //   };

  //   axios.post('', data)
  //     .then(res => {
  //       const name = res.data.agent_name;
  //       setAgentName(name);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     })
  // });

  return (
    <div>
    <form className={styles.form} onSubmit={(e) => {
      e.preventDefault();

      if (agentId && amount) {
        setComponentToRender("summary");
      }
    }}>
        <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} />
        </div>
        <label>
          <span>Agent ID</span>
          <input type="text" value={agentId} className={styles.outlineGrey} onChange={handleOnAgentIdChange} />
        </label>
        <label>
          <span>Agent Name</span>
          <input type="text" value={agentName} className={styles.outlineGrey} readOnly={true} />
        </label>
        <label>
          <span>Amount</span>
          <input type="text" value={amount} className={styles.outlineGrey} onChange={handleOnAmountChange} />
        </label>
        <button>Submit</button>
      </form>      
    </div>
  )
};

export default WalletTransferForm;
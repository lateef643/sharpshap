import React from "react";
import styles from "./WalletTransferForm.module.scss";

export const WalletTransferForm = () => {
  return (
    <div>
    <form className={styles.form} onSubmit={handleOnContinue}>
        <div className={styles.imageContainer}>
          <img src={wallet} className={styles.image} />
        </div>
        <div className={styles.inputContainer}>
          <label>
            <span>Agent ID</span>
            <input type="text" onChange={handleOnAgentIdChange} />
          </label>
          <label>
            <span>Agent Name</span>
            <input type="text" onChange={handleOnAgentNameChange} />
          </label>
          <label>
            <span>Amount</span>
            <input type="text" onChange={handleOnAmountChange} />
          </label>
        </div>
        <button>Submit</button>
      </form>      
    </div>
  )
};

export default WalletTransferForm;
 
import React from "react";
import cross from "../../assets/images/cross.svg";
import { Link } from "react-router-dom";
import styles from "./FailedTransaction.module.scss";

const FailedTransaction = () => (
  <div className={styles.container}>
    <img src={cross}/>
    <p>We were unable to process your transaction, please try again later.</p>  
    <div>
      <Link to="/"><span className={styles.linkHome}>Home</span></Link>
    </div>
  </div>
);

export default FailedTransaction;
import React from "react";
import { Link } from "react-router-dom";

import success from "../../../assets/icons/success.svg";

import styles from "./BuyAirtimeStatus.module.scss";

export const BuyAirtimeStatus = (props) => {
  const { successData, setComponentToRender } = props;

  return (
    <div className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={success} alt="" className={styles.image} />
      </div>
      <div className={styles.textContainer}>
        <p className={styles.message}>Transaction successful</p>
        <p className={styles.reference}>{successData.reference}</p>
      </div>
      <div className={styles.action}>
        <Link to="/" className={`${styles.buttonAction} ${styles.buttonHome}`}>
          Home
        </Link>
      </div>
    </div>
  );
};

export default BuyAirtimeStatus;

import React from "react";

import flexShieldSilver from "../../assets/icons/silver-badge-alt.svg";
import flexShieldBronze from "../../assets/icons/bronze-badge.svg";
import flexShieldGold from "../../assets/icons/gold-badge.svg";
import checkmark from "../../assets/icons/status-checkmark.svg";

import styles from "./CustomerStatus.module.scss";

const CustomerStatus = (props) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.sectionStatus}>
          <div className={styles.sectionImageContainer}>
            <img
              className={styles.sectionImage}
              src={flexShieldBronze}
              alt=""
            />
          </div>
          <p className={styles.sectionTag}>Flex Agent</p>
          <div className={styles.sectionStatusCheckContainer}>
            <img className={styles.sectionStatusCheck} src={checkmark} alt="" />
          </div>
          <div className={styles.sectionStatusIndicator}></div>
        </div>
        <div className={styles.sectionDetails}>
          <p>
            To be a Flex Agent, you must have completed up to 1 - 450
            Transactions within a month
          </p>
        </div>
      </div>{" "}
      <div className={styles.section}>
        <div className={styles.sectionStatus}>
          <div className={styles.sectionImageContainer}>
            <img
              className={styles.sectionImage}
              src={flexShieldSilver}
              alt=""
            />
          </div>
          <p className={styles.sectionTag}>Flex Agent</p>
          <div className={styles.sectionStatusCheckContainer}>
            <img className={styles.sectionStatusCheck} src={checkmark} alt="" />
          </div>
          <div className={styles.sectionStatusIndicator}></div>
        </div>
        <div className={styles.sectionDetails}>
          <p>
            To be a Premium Agent, you must have completed up to 450 - 1000
            Transactions within a month
          </p>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.sectionStatus}>
          <div className={styles.sectionImageContainer}>
            <img className={styles.sectionImage} src={flexShieldGold} alt="" />
          </div>
          <p className={styles.sectionTag}>Flex Agent</p>
          <div className={styles.sectionStatusCheckContainer}>
            <img className={styles.sectionStatusCheck} src={checkmark} alt="" />
          </div>
          <div className={styles.sectionStatusIndicator}></div>
        </div>
        <div className={styles.sectionDetails}>
          <p>
            To be a VIP Agent, you must have completed up to 1000 or more
            Transactions within a month
          </p>
        </div>
      </div>
    </div>
  );
};

export default CustomerStatus;

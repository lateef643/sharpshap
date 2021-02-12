import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setDisplayModal } from "../actions/modal";

import { setCurrentPage } from "../actions/page";
import consumerLoan from "../assets/icons/consumerIcon.svg";
import repaymentIcon from "../assets/icons/repaymentIcon.svg";
import loanIcon from "../assets/icons/loanHistoryIcon.svg";
import agentLoan from "../assets/icons/agentLoanIcon.svg";

import styles from "./Loan.module.scss";

export const Loan = ({ changeCurrentPage, displayModal }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Bill Payment",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Quick Actions</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "loanApplication",
                  service: "agentLoan",
                });
              }}
            >
              <span
                className={`${styles.serviceLogoContainer} ${styles.serviceLogoContainerAgent}`}
              >
                <img className={styles.serviceLogo} src={agentLoan} alt="" />
              </span>
              <p className={styles.serviceText}>Agent Loan</p>
            </div>
            {/* <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "dataRecharge",
                  service: "airtel",
                });
              }}
            >
              <span
                className={`${styles.serviceLogoContainer} ${styles.serviceLogoContainerConsumer}`}
              >
                <img className={styles.serviceLogo} src={consumerLoan} alt="" />
              </span>
              <p className={styles.serviceText}>Consumer Loan</p>
            </div> */}
            <Link to="loan/history" className={styles.service}>
              <span
                className={`${styles.serviceLogoContainer} ${styles.serviceLogoContainerRepayment}`}
              >
                <img className={styles.serviceLogo} src={loanIcon} alt="" />
              </span>
              <p className={styles.serviceText}>Loan History</p>
            </Link>
            <Link to="loan/repayment-history" className={styles.service}>
              <span
                className={`${styles.serviceLogoContainer} ${styles.serviceLogoContainerRepayment}`}
              >
                <img
                  className={styles.serviceLogo}
                  src={repaymentIcon}
                  alt=""
                />
              </span>
              <p className={styles.serviceText}>Repayment History</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Loan);

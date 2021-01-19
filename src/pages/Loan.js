import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setDisplayModal } from "../actions/modal";

import { setCurrentPage } from "../actions/page";
import mtn from "../assets/images/MTN Logo.svg";
import airtel from "../assets/images/Airtel.svg";
import requestloan from "../assets/icons/requestloan.svg";

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
          <h3 className={styles.sectionHeading}>Loan</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "dataRecharge",
                  service: "mtn",
                });
              }}
            >
              <img className={styles.serviceLogo} src={requestloan} alt="" />
              <p className={styles.serviceText}>Request</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "dataRecharge",
                  service: "airtel",
                });
              }}
            >
              <img className={styles.serviceLogo} src={requestloan} alt="" />
              <p className={styles.serviceText}>Pay</p>
            </div>
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

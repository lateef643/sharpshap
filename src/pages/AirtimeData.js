import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setDisplayModal } from "../actions/modal";

import { setCurrentPage } from "../actions/page";
import mtn from "../assets/images/MTN Logo.svg";
import airtel from "../assets/images/Airtel.svg";
import glo from "../assets/images/glo.svg";
import nineMobile from "../assets/images/9mobile.svg";

import styles from "./AirtimeData.module.scss";

export const AirtimeData = ({ changeCurrentPage, displayModal }) => {
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
          <h3 className={styles.sectionHeading}>Airtime</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "airtimeRecharge",
                  service: "mtn",
                });
              }}
            >
              <img className={styles.serviceLogo} src={mtn} alt="" />
              <p className={styles.serviceText}>MTN</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "airtimeRecharge",
                  service: "airtel",
                });
              }}
            >
              <img className={styles.serviceLogo} src={airtel} alt="" />
              <p className={styles.serviceText}>Airtel</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "airtimeRecharge",
                  service: "glo",
                });
              }}
            >
              <img className={styles.serviceLogo} src={glo} alt="" />
              <p className={styles.serviceText}>Glo</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "airtimeRecharge",
                  service: "9mobile",
                });
              }}
            >
              <img className={styles.serviceLogo} src={nineMobile} alt="" />
              <p className={styles.serviceText}>9mobile</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Data</h3>
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
              <img className={styles.serviceLogo} src={mtn} alt="" />
              <p className={styles.serviceText}>MTN</p>
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
              <img className={styles.serviceLogo} src={airtel} alt="" />
              <p className={styles.serviceText}>Airtel</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "dataRecharge",
                  service: "glo",
                });
              }}
            >
              <img className={styles.serviceLogo} src={glo} alt="" />
              <p className={styles.serviceText}>Glo</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "dataRecharge",
                  service: "9mobile",
                });
              }}
            >
              <img className={styles.serviceLogo} src={nineMobile} alt="" />
              <p className={styles.serviceText}>9mobile</p>
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

export default connect(undefined, mapDispatchToProps)(AirtimeData);

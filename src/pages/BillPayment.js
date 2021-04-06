import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setDisplayModal } from "../actions/modal";

import { setCurrentPage } from "../actions/page";

import kedc from "../assets/icons/kedc.svg";
import kedco from "../assets/icons/kedco.svg";
import ikedc from "../assets/icons/ikedc.svg";
import eedc from "../assets/icons/eedc.svg";
import phedc from "../assets/icons/phdc.svg";
import aedc from "../assets/icons/aedc.svg";
import ekedc from "../assets/icons/ekedc.svg";
import ibedc from "../assets/images/IBEDC.png";

import gotv from "../assets/icons/gotv.svg";
import dstv from "../assets/icons/dstv.svg";
import startimes from "../assets/icons/startimes.svg";

import styles from "./BillPayment.module.scss";

export const BillPayment = ({ changeCurrentPage, displayModal }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Bill Payment",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={`${styles.card} ${styles.cardElectricity}`}>
          <h3 className={styles.sectionHeading}>Electricity</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "ikedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={ikedc} alt="" />
              <p className={styles.serviceText}>IKEDC</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "ekedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={ekedc} alt="" />
              <p className={styles.serviceText}>Eko</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "ibedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={ibedc} alt="" />
              <p className={styles.serviceText}>IBEDC</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "aedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={aedc} alt="" />
              <p className={styles.serviceText}>Abuja</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "eedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={eedc} alt="" />
              <p className={styles.serviceText}>Enugu</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "kedco",
                });
              }}
            >
              <img className={styles.serviceLogo} src={kedco} alt="" />
              <p className={styles.serviceText}>Kaduna</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "kedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={kedc} alt="" />
              <p className={styles.serviceText}>Kano</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "phedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={phedc} alt="" />
              <p className={styles.serviceText}>PH</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "energy",
                  service: "bedc",
                });
              }}
            >
              <img className={styles.serviceLogo} src={phedc} alt="" />
              <p className={styles.serviceText}>Benin</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.section}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Cable TV</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "cableRecharge",
                  service: "dstv",
                });
              }}
            >
              <img className={styles.serviceLogo} src={dstv} alt="" />
              <p className={styles.serviceText}>DSTV</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "cableRecharge",
                  service: "gotv",
                });
              }}
            >
              <img className={styles.serviceLogo} src={gotv} alt="" />
              <p className={styles.serviceText}>GOTV</p>
            </div>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "cableRecharge",
                  service: "startimes",
                });
              }}
            >
              <img className={styles.serviceLogo} src={startimes} alt="" />
              <p className={styles.serviceText}>Startimes</p>
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

export default connect(undefined, mapDispatchToProps)(BillPayment);

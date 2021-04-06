import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { setDisplayModal } from "../actions/modal";

import { setCurrentPage } from "../actions/page";
import betway from "../assets/icons/Betway Logo.svg";
import bet9ja from "../assets/icons/Bet9ja Logo.svg";
import sportybet from "../assets/icons/SportyBet Logo.svg";
import nairabet from "../assets/icons/Nairabet Logo.svg";
import cloudbet from "../assets/icons/cloudbet.jpg";

import styles from "./Betting.module.scss";

export const Betting = ({ changeCurrentPage, displayModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Betting Providers</h3>
          <div className={styles.services}>
            <Link to="/betting/cloudbet" className={styles.service}>
              <img className={styles.serviceLogo} src={cloudbet} alt="" />
              <p className={styles.serviceText}>Cloudbet</p>
            </Link>
            <Link to="/betting/bet9ja" className={styles.service}>
              <img className={styles.serviceLogo} src={bet9ja} alt="" />
              <p className={styles.serviceText}>Bet9ja</p>
            </Link>
            <Link to="/betting/betway" className={styles.service}>
              <img className={styles.serviceLogo} src={betway} alt="" />
              <p className={styles.serviceText}>Betway</p>
            </Link>
            <Link to="/betting/sportybet" className={styles.service}>
              <img className={styles.serviceLogo} src={sportybet} alt="" />
              <p className={styles.serviceText}>Sportybet</p>
            </Link>
            <Link to="/betting/nairabet" className={styles.service}>
              <img className={styles.serviceLogo} src={nairabet} alt="" />
              <p className={styles.serviceText}>Nairabet</p>
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

export default connect(undefined, mapDispatchToProps)(Betting);

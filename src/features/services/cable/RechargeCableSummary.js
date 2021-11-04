import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThreeDots } from "svg-loaders-react";

import Submit from "../../../components/common/Button";

import back from "../../../assets/images/left-arrow.svg";
import info from "../../../assets/images/tooltip-icon.svg";
import generateServiceProviderImageUrl from "./generateServiceProviderImageUrl";
import formatToCurrency from "../../../utils/formatToCurrency";

import styles from "./RechargeCableSummary.module.scss";

var Barcode = require("react-barcode");

export const RechargeCableSummary = (props) => {
  const {
    RechargeCableFormState: state,
    loading,
    handleOnSubmit,
    transactionCost,
    service,
    setComponentToRender,
  } = props;

  const serviceProviderImageUrl = generateServiceProviderImageUrl(service);

  return (
    <div className={styles.container}>
      <div
        className={styles.back}
        onClick={() => {
          setComponentToRender("form");
        }}
      >
        <img className={styles.backIcon} src={back} alt="" />
        <span className={styles.backText}>Back</span>
      </div>
      <div className={styles.logoContainer}>
        <img className={styles.logo} src={serviceProviderImageUrl} alt="" />
      </div>
      <div className={styles.heading}>
        <div className={styles.headingIconContainer}>
          <img className={styles.headingIcon} src={info} alt="" />
        </div>
        <div className={styles.headingText}>
          Verify the information before proceeding.
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Service:</span>
          <span className={styles.contentDetails}>{service.toUpperCase()}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Account Name:</span>
          <span className={styles.contentDetails}>{state.customerName}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Smart card:</span>
          <span className={styles.contentDetails}>{state.smartCardNumber}</span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Amount:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(state.amount)}
          </span>
        </div>
        <div className={styles.contentItem}>
          <span className={styles.contentHeading}>Transaction cost:</span>
          <span className={styles.contentDetails}>
            &#8358;{formatToCurrency(transactionCost)}
          </span>
        </div>
      </div>
      <div className={`${styles.contentItem} ${styles.total}`}>
        <span className={`${styles.contentHeading} ${styles.totalHeading}`}>
          Total:
        </span>
        <span className={`${styles.contentDetails} ${styles.totalDetails}`}>
          &#8358;{formatToCurrency(state.amount)}
        </span>
      </div>
      <Submit disabled={false} onClick={handleOnSubmit}>
        {loading ? <ThreeDots fill="white" /> : "Proceed"}
      </Submit>
    </div>
  );
};

RechargeCableSummary.propTypes = {
  RechargeCableFormState: PropTypes.object,
  loading: PropTypes.bool,
  handleOnSubmit: PropTypes.func,
  transactionCost: PropTypes.number,
};

const mapStateToProps = (state) => {
  return {
    service: state.modal.service,
  };
};

export default connect(mapStateToProps)(RechargeCableSummary);

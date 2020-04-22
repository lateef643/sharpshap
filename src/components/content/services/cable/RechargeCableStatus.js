import React from "react";
import { connect } from "react-redux";
import check from "../../../../assets/images/check.svg";
import style from './RechargeCableStatus.module.scss';

export const RechargeCableStatus = ({ successPayload }) => {
  return (
    <div className={style.container}>
      <div className={style.sectionContainer} >
        <div className={style.imageContainer}>
          <img src={check} alt="green checkmark" />
          <p>Transaction Successful</p>
        </div>

        <div className={style.contentContainer}>
        </div>    
      </div>
    </div>
)};

export default RechargeCableStatus;
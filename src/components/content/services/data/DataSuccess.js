import React from "react";
import { connect } from "react-redux";
import check from "../../../../assets/images/check.svg";
import style from './SuccessfulTransaction.module.scss';

export const SuccessfulTransaction = ({ successPayload }) => {
  return (
    <div className={style.container}>
      <div className={style.sectionContainer} >
        <div className={style.imageContainer}>
          <img src={check} alt="green checkmark" />
          <p>Transaction Successful</p>
        </div>

        <div className={style.contentContainer}>
          {successPayload.status ? <div>
            <span>Status:</span>
            <span>{successPayload.status}</span>   
          </div> : undefined}
          {successPayload.statusDescription ? <div>
            <span>Status:</span>
            <span>{successPayload.statusDescription}</span>   
          </div> : undefined}
          {successPayload.referenceCode ? <div>
            <span>Reference Code:</span>
            <span>{successPayload.referenceCode}</span>   
          </div> : undefined}
          {successPayload.payment_reference ? <div>
            <span>Reference Code:</span>
            <span>{successPayload.payment_reference}</span>   
          </div> : undefined}
          {successPayload.amount ? <div>
            <span>Amount:</span>
            <span><b>&#8358;{Number(successPayload.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</b></span>   
          </div>  : undefined} 
          {successPayload.recipient ? <div>
            <span>Recipient:</span>
            <span>{successPayload.recipient}</span>   
          </div> : undefined}
          {successPayload.network ? <div>
            <span>Network:</span>
            <span>{successPayload.network}</span>   
          </div> : undefined}
          {successPayload.beneficiary_account_name ? <div>
            <span>Account Name:</span>
            <span>{successPayload.beneficiary_account_name}</span>   
          </div> : undefined}
          {successPayload.beneficiary_account_number ? <div>
            <span>Account Number:</span>
            <span>{successPayload.beneficiary_account_number}</span>   
          </div> : undefined}
          {successPayload.date ? <div>
            <span>Date:</span>
            <span>{successPayload.date}</span>   
          </div> : undefined}
        </div>
      </div>    
    </div>
)};

export default SuccessfulTransaction;
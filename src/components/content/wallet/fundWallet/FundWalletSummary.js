import React, {useEffect} from "react";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import style from './FundWalletSummary.module.scss';

export const FundWalletSummary = ({ tellerNumber, amount, bank, accountName, accountNumber, loading, handleOnSubmit }) => {
  return (
    <div className={style.paymentContainer} >
      <div className={style.heading}>
        <h2 className={style.headingText}>Transaction Summary</h2>
      </div>
      <div>
        {loading ? <p className={style.pending}>Please wait while your transaction is processing...</p> : undefined}
      </div>
      <div>
        <span>Bank:</span>
        <span>{bank}</span>
      </div>
      <div>
        <span>Account Number:</span>
        <span>{accountNumber}</span>
      </div>
      <div>
        <span>Account Name:</span>
        <span>{accountName}</span>
      </div>
      <div>
        <span>Teller Number:</span>
        <span>{tellerNumber}</span>
      </div>       
      <div className={style.total}>    
        <span>Amount:</span>
        <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span> 
      </div> 
      <button onClick={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}>{loading ? <Loader size="small" color="white" position="center" /> : "Continue"}</button>       
    </div>    
)};

export default FundWalletSummary;
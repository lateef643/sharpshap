import React, {useEffect} from "react";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import style from './WalletTransferSummary.module.scss';

export const WalletTransferSummary = ({ agentId, agentName, amount, transactionCost, total, loading, handleOnSubmit }) => {
  return (
    <div className={style.container}>
      <div className={style.paymentContainer} >
        <div className={style.heading}>
          <h2 className={style.headingText}>Transaction Summary</h2>
        </div>
        <div>
          {loading ? <p className={style.pending}>Please wait while your transaction is processing...</p> : undefined}
        </div>
        <div>
          <span>Agent ID:</span>
          <span>{agentId}</span>
        </div>
        <div>
          <span>Agent Name:</span>
          <span>{agentName}</span>
        </div>
        <div>
          <span>Amount:</span>
          <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </div>
        <div>
          <span>Transaction Cost:</span>
          <span>&#8358;{Number(transactionCost).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </div>        
        <div className={style.total}>    
          <span>Total:</span>
          <span>&#8358;{Number(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span> 
        </div> 
        <button onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}>{loading ? <Loader size="small" color="white" position="center" /> : "Continue"}</button>       
      </div>    
    </div>
)};

export default WalletTransferSummary;
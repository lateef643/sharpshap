import React, {useEffect} from "react";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import style from './RechargeCableSummary.module.scss';

export const RechargeCableSummary = (props) => {
  const { smartCardNumber, amount, plan, provider, planDuration, customerName, loading, handleOnSubmit} = props;

  return (
    <div className={style.paymentContainer} >
      <div className={style.heading}>
        <h2 className={style.headingText}>Transaction Summary</h2>
      </div>
      <div>
        {loading ? <p className={style.pending}>Please wait while your transaction is processing...</p> : undefined}
      </div>
      <div>
        <span>Service:</span>
        <span>{provider}</span>
      </div>
      <div>
        <span>Plan:</span>
        <span>{plan}</span>
      </div>
      <div>
        <span>Account Name:</span>
        <span>{customerName}</span>
      </div>
      <div>
        <span>Smart card:</span>
        <span>{smartCardNumber}</span>
      </div> 
      <div>
        <span>Plan Duration:</span>
        <span>{planDuration} {planDuration === "1" ? "month" : "months"}</span>
      </div>
      <div>
        <span>Amount:</span>
        <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
      </div> 
      <div>
        <span>Transaction cost:</span>
        <span>&#8358;{Number(0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
      </div>     
      <div className={style.total}>    
        <span>Total:</span>
        <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span> 
      </div> 
      <button onClick={(e) => {
        e.preventDefault();
        handleOnSubmit();
      }}>{loading ? <Loader size="small" color="white" position="center" /> : "Continue"}</button>       
    </div>    
)};

export default RechargeCableSummary;
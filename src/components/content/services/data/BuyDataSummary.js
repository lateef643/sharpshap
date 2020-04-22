import React, {useEffect} from "react";
import { connect } from "react-redux";
import Loader from "../../../partials/Loader";
import style from './BuyDataSummary.module.scss';

export const BuyDataSummary = (props) => {
  const { telcoName, amount, phone, loading, handleOnSubmit, selectedDataPlanName, selectedDataPlanValidity } = props;

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
          <span>Phone Number:</span>
          <span>{phone}</span>
        </div>
        <div>
          <span>Network:</span>
          <span>{telcoName}</span>
        </div>
        <div>
          <span>Data Bundle:</span>
          <span>{selectedDataPlanName}</span>
        </div>
        <div>
          <span>Validity:</span>
          <span>{selectedDataPlanValidity}</span>
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
    </div>
)};

export default BuyDataSummary;
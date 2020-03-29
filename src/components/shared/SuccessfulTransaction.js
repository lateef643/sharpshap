import React from "react";
import { connect } from "react-redux";
import check from "../../assets/images/check.svg";
import style from './SuccessfulTransaction.module.scss';
import { setCurrentPage } from "../../actions/page";

export const SuccessfulTransaction = ({ changeCurrentPage, amount, referenceCode, transactionDate, transactionType, total}) => {
  changeCurrentPage({
    heading: "Successful Transaction",
    search: false
  });

  return (
    <div className={style.container}>
      <div className={style.sectionContainer} >
        <div>
          <img src={check} alt="green checkmark" />
          <p>Transaction Successful</p>
        </div>
        <div>
          <span>Amount</span>
          <span>{amount}</span>
        </div>
        <div>
          <span>Reference Code</span>
          <span>{referenceCode}</span>   
        </div>
        <div>    
          <span>Transaction Date</span>
          <span>{transactionDate}</span> 
        </div> 
        <div>    
          <span>Transaction Type</span>
          <span>{transactionType}</span> 
        </div>       
        <div>    
          <span>Total</span>
          <span>{total}</span> 
        </div> 
      </div>    
    </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => (dispatch(setCurrentPage(payload)))
  }
};

export default connect(undefined, mapDispatchToProps)(SuccessfulTransaction);
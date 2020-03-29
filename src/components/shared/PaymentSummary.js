import React from "react";
import { connect } from "react-redux";
import style from './PaymentSummary.module.scss';
import { setCurrentPage } from "../../actions/page";

export const PaymentSummary = ({ changeCurrentPage, phoneNumber, amount, total, handleOnSubmit, handleSetPage }) => {
  changeCurrentPage({
    heading: "Verification",
    search: false
  });

  return (
    <div className={style.container}>
      <div className={style.paymentContainer} >
        <div>
          <span>Phone Number</span>
          <span>{phoneNumber}</span>
        </div>
        <div>
          <span>Amount</span>
          <span>{amount}</span>
        </div>
        <div>    
          <span>Total</span>
          <span>{total}</span> 
        </div> 
        <button onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
          handleSetPage("success");
        }}>Continue</button>       
      </div>    
    </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => (dispatch(setCurrentPage(payload)))
  }
};

export default connect(undefined, mapDispatchToProps)(PaymentSummary);
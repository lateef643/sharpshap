import React, {useEffect} from "react";
import { connect } from "react-redux";
import Loader from "../partials/Loader";
import style from './PaymentSummary.module.scss';
import { setCurrentPage } from "../../actions/page";

export const PaymentSummary = ({ changeCurrentPage, errorText, phone, loading, amount, accountNumber, total, handleOnSubmit, handleSetPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Verification",
      search: false
    });    
  }, [changeCurrentPage])

  return (
    <div className={style.container}>
      <div className={style.paymentContainer} >
      <div>
      {errorText ? <p className={style.error}>{errorText}</p> : undefined}
      </div>
      <div>
          <span>Account Number:</span>
          <span>{accountNumber}</span>
        </div>
        <div>
          <span>Phone Number:</span>
          <span>{phone}</span>
        </div>
        <div>
          <span>Amount:</span>
          <span>&#8358;{Number(amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>
        </div>
        <div className={style.total}>    
          <span>Total</span>
          <span>&#8358;{Number(total).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span> 
        </div> 
        <button onClick={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}>{loading ? <Loader size="small" color="white" position="center" /> : "Continue"}</button>       
      </div>    
    </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => (dispatch(setCurrentPage(payload)))
  }
};

export default connect(undefined, mapDispatchToProps)(PaymentSummary);
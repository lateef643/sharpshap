import React, {useState, useEffect} from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { GET_AGENT_INFO } from "../../store/api/constants";
import cico from "../../assets/images/cico-logo-login.svg";
import styles from './TransactionDetails.module.scss';
import { setCurrentPage } from "../../actions/page";

export const TransactionDetails = ({ uuid, changeCurrentPage, match}) => {
  const [transaction, setTransaction] = useState({});
  const [transtype, setTranstype] = useState({});

  useEffect(() => {
    axios.get(`${GET_AGENT_INFO}/${uuid}`)
    .then(res => {
      const transactions = res.data.data.transaction;

      const transaction = transactions.find(transaction => {
        return transaction.reference === match.params.id;
      });

      setTransaction(transaction);
      setTranstype(transaction.transtype);
    })
    .catch(err => {
      console.log(err);
    });
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "Transaction Details",
      search: false
    });    
  });

  return (
    <div className={styles.section}>
      <div className={styles.imageContainer}>
        <img className={styles.headingImage} src={cico} alt="cico logo" />
        <p className={styles.headingText}>Transaction Details</p>
      </div>
      <div className={styles.contentContainer}>
        <div className={styles.successContent}>
          <div className={styles.transactionDetails}>
          <div>
              <span>Status:</span>
              <span>{transaction.status}</span>  
            </div>
            <div>
              <span>Reference:</span>
              <span>{transaction.reference}</span>  
            </div>
            <div>
              <span>Type:</span>
              <span>{transtype.name}</span>  
            </div>
            <div>
              <span>Customer:</span>
              <span className={styles.customerInfo}>{transaction.customer_info}</span>  
            </div>
            <div>
              <span>Date:</span>
              <span>{transaction.created_at}</span>  
            </div>
          </div>
          <div className={styles.transactionAmount}>
            <div>
              <span>Amount:</span>
              <span>&#8358;{Number(transaction.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
            </div>
            <div>
              <span>Convenience Fee:</span>
              <span>&#8358;{Number(0).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
            </div>
            <div className={styles.total}>
              <span>Total:</span>
              <span>&#8358;{Number(transaction.amount).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</span>  
            </div>
          </div>
            <div className={styles.link}>
              <Link to="/" className={styles.linkHome}>Go Home</Link>
              <div onClick={() => window.print()} className={styles.linkServiceHome}>Print</div>
            </div>
          </div>
    </div>
  </div>  
)};

const mapStateToProps = (state) => {
  return {
    uuid: state.auth.user.agent.uuid
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => (dispatch(setCurrentPage(payload)))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(TransactionDetails);
import React from "react";
import { connect } from "react-redux";

import FundsTransfer from "../../features/services/transfer/index";
import AirtimeRecharge from "../../features/services/airtime/index";
import DataRecharge from "../../features/services/data/index";
import Energy from "../../features/services/electricity/index";
import CableRecharge from "../../features/services/cable/index";
import AddUser from "../../features/users/AddUser";
import TransactionPin from "../profile/TransactionPin";
import Password from "../../features/profile/Password";
import BetslipModal from "../../features/services/betting/play/BetslipModal";
import WalletTransfer from "../../features/services/walletTransfer/WalletTransfer";
import FundBettingWallet from "../../features/services/betting/fundWallet/FundWallet";
import CustomerStatus from "../../features/profile/CustomerStatus";
import LoanApplication from "../../features/services/loan/AgentLoan";
import closeIcon from "../../assets/icons/closeModal.svg";
import { setDisplayModal } from "../../actions/modal";

import styles from "./Modal.module.scss";

const Modal = ({ overlay, modal, displayModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.toggleClose}>
        <img
          className={styles.close}
          onClick={() => {
            displayModal({
              modal: false,
              overlay: false,
            });
          }}
          src={closeIcon}
          alt=""
        />
      </div>
      {
        {
          fundsTransfer: <FundsTransfer />,
          airtimeRecharge: <AirtimeRecharge />,
          dataRecharge: <DataRecharge />,
          energy: <Energy />,
          cableRecharge: <CableRecharge />,
          pin: <TransactionPin />,
          addUsers: <AddUser />,
          password: <Password />,
          walletTransfer: <WalletTransfer />,
          fundBettingWallet: <FundBettingWallet />,
          customerStatus: <CustomerStatus />,
          loanApplication: <LoanApplication />,
          printBetsip: <BetslipModal />,
        }[modal]
      }
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    overlay: state.modal.overlay,
    modal: state.modal.modal,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

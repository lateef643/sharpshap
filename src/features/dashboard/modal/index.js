import React from "react";
import { connect } from "react-redux";

import Overlay from "./Overlay";
import Modal from "./Modal";

import { setDisplayModal } from "../../../actions/modal";

import FundsTransfer from "../../../features/services/transfer/index";
import AirtimeRecharge from "../../../features/services/airtime/index";
import DataRecharge from "../../../features/services/data/index";
import Energy from "../../../features/services/electricity/index";
import CableRecharge from "../../../features/services/cable/index";
import AddUser from "../../../features/users/AddUser";
import TransactionPin from "../../profile/TransactionPin";
import Password from "../../../features/profile/Password";
import BetslipModal from "../../../features/services/betting/play/BetslipModal";
import WalletTransfer from "../../../features/services/walletTransfer/WalletTransfer";
import FundBettingWallet from "../../../features/services/betting/fundWallet/FundWallet";
import CustomerStatus from "../../../features/profile/CustomerStatus";
import LoanApplication from "../../../features/services/loan/AgentLoan";
import toggle from "../../../assets/icons/closeModal.svg";

import styles from "./index.module.scss";

const OverlayContainer = ({ overlay, modal, displayModal }) => {
  return (
    <div className={styles.container}>
      <div
        className={styles.overlayToggleContainer}
        onClick={() => {
          displayModal({
            modal: false,
            overlay: false,
          });
        }}
      >
        <img className={styles.overlayToggle} src={toggle} alt="" />
      </div>
      <Overlay>
        <Modal>
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
        </Modal>
      </Overlay>
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

export default connect(mapStateToProps, mapDispatchToProps)(OverlayContainer);

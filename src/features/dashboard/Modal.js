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

import styles from "./Modal.module.scss";

const Modal = ({ overlay, modal }) => {
  return (
    <div
      className={
        overlay ? `${styles.modal} ${styles.displayModal}` : `${styles.modal}`
      }
    >
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

export default connect(mapStateToProps)(Modal);

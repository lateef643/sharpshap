import React from "react";
import { connect } from "react-redux";

import { setDisplayModal } from "../../actions/modal";
import Modal from "./Modal";

import styles from "./Overlay.module.scss";

const Overlay = ({ overlay, displayModal }) => {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Modal />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    overlay: state.modal.overlay,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

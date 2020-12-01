import React from "react";
import { connect } from "react-redux";

import { setDisplayModal } from "../../actions/modal";

import styles from "./Overlay.module.scss";

const Overlay = ({ overlay, displayModal }) => {
  console.log(overlay);

  return (
    <div
      className={
        overlay
          ? `${styles.overlay} ${styles.displayOverlay}`
          : `${styles.modal}`
      }
      onClick={(e) => {
        displayModal({
          modal: false,
          overlay: false,
        });
      }}
    ></div>
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

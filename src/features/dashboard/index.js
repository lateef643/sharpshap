import React, { useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import { setDisplayModal } from "../../actions/modal";
import Main from "./Main";

import styles from "./index.module.scss";

const Dashboard = ({ overlay, displayModal }) => {
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

    console.log("how often does this run");

    if (overlay) {
      body.style.maxHeight = "100vh";
      body.style.overflow = "hidden";
    } else {
      body.style.maxHeight = "initial";
      body.style.overflow = "auto";
    }
  }, [overlay]);

  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
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

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);

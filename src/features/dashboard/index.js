import React, { useEffect } from "react";
import { connect } from "react-redux";
import Sidebar from "./Sidebar";
import Main from "./Main";

import styles from "./index.module.scss";

const Dashboard = ({ overlay }) => {
  console.log("the dashboard is rendering");
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];

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

export default connect(mapStateToProps)(Dashboard);

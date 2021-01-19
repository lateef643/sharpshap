import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

import styles from "./index.module.scss";

const Dashboard = () => {
  return (
    <div className={styles.container}>
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;

import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";

const Dashboard = () => {
  console.log("this dashboard is the shit");
  return (
    <div className="container">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;

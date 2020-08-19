import React from "react";
import Sidebar from "./Sidebar";
import Main from "./Main";
// import routes from "../routes/routes";

const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar />
      <Main />
    </div>
  );
};

export default Dashboard;

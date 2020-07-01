import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";

import routes from "./routes/router";
import Login from "./components/pages/Login";
import Sidebar from "./components/partials/Sidebar";
import Main from "./components/partials/Main";

import "./App.scss";

export const App = ({ isAuthenticated }) => {
  const history = createBrowserHistory();

  return (
    <>
      {!isAuthenticated ? (
        <Login />
      ) : (
        <Router>
          <div className="app">
            <Sidebar />
            <Main routes={routes} history={history} />
          </div>
        </Router>
      )}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(App);

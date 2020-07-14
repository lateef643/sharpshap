import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";

import routes from "./routes/router";
import Login from "./components/pages/Login";
import ForgotPassword from "./components/pages/ForgotPassword";
import Sidebar from "./components/partials/Sidebar";
import Main from "./components/partials/Main";

import "./App.scss";

export const App = ({ isAuthenticated }) => {
  const history = createBrowserHistory();

  return (
    <>
      {!isAuthenticated ? (
        <Router>
          <Switch>
            <Route path="/" component={Login} exact />
            <Route path="/forgot-password" component={ForgotPassword} />
          </Switch>
        </Router>
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

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { createBrowserHistory } from "history";
import Login from "../pages/Login";
import Sidebar from "./Sidebar";
import Header from "./Header";
import './Container.scss';

const history = createBrowserHistory();

export const AppShell = (props) => {
  return (
    <>
    {!props.isAuthenticated ? <Login /> : <Router>
      <div className="container">
        <div className="container-sidebar">
          <Sidebar />
        </div>
        <div className="container-main">
          <div className="container-main-header">
            <Header />
          </div>
          <div className="container-main-content">
            <Switch>
              {props.routes.map((route, index) => (
                <Route
                  history={history}
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  children={<route.main />}
                />
              ))}
            </Switch>            
          </div>
        </div>
      </div>
    </Router> }
    </>
  );
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default connect(mapStateToProps)(AppShell);
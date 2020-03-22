import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";
import './Container.scss';

const AppShell = (props) => {
  return (
    <Router>
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
    </Router>
  );
}

export default AppShell;
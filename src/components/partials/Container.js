import React from "react";
import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import StatusBar from "./StatusBar";
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
        <div style={{ flex: "1" }}>
          <Header />
          <StatusBar />
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
    </Router>
  );
}

export default AppShell;
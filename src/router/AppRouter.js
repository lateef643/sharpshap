import React from "react";
import { Switch } from "react-router-dom";

import Login from "../pages/Login";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../components/layout/Dashboard";
import PublicRoute from "../router/PublicRoute";
import PrivateRoute from "../router/PrivateRoute";

import "./AppRouter.scss";

export const AppRouter = () => {
  return (
    <Switch>
      <PublicRoute path="/forgot-password" component={ForgotPassword} />
      <PublicRoute path="/login" component={Login} exact />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
};

export default AppRouter;

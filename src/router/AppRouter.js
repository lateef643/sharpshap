import React from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "../router/PublicRoute";
import PrivateRoute from "../router/PrivateRoute";

import "./AppRouter.scss";

import Landing from "../pages/Landing";
import ForgotPassword from "../pages/ForgotPassword";
import Dashboard from "../features/dashboard/index";
import Register from "../pages/createAgent/index";

export const AppRouter = () => {
  return (
    <Switch>
      <PublicRoute path="/forgot-password" component={ForgotPassword} />
      <PublicRoute path="/login" component={Landing} exact />
      <PublicRoute path="/register" component={Register} exact />
      <PrivateRoute path="/" component={Dashboard} />
    </Switch>
  );
};

export default AppRouter;

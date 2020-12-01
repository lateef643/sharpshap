import React, { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";

import PublicRoute from "../router/PublicRoute";
import PrivateRoute from "../router/PrivateRoute";

import "./AppRouter.scss";

const Landing = lazy(() => import("../pages/Landing"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));
const Dashboard = lazy(() => import("../features/dashboard/index"));
const Register = lazy(() => import("../pages/createAgent/index"));

export const AppRouter = () => {
  console.log("app router is run and this is the start");
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Switch>
        <PublicRoute path="/forgot-password" component={ForgotPassword} />
        <PublicRoute path="/login" component={Landing} exact />
        <PublicRoute path="/register" component={Register} exact />
        <PrivateRoute path="/" component={Dashboard} />
      </Switch>
    </Suspense>
  );
};

export default AppRouter;

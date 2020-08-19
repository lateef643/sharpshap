import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  path,
  isDefaultPassword,
  routes,
  ...rest
}) => {
  return (
    <>
      {isDefaultPassword == 0 ? (
        <Route
          {...rest}
          render={({ match }) => <Component routes={routes} match={match} />}
        />
      ) : (
        <Switch>
          <Redirect to="/profile" />
        </Switch>
      )}
    </>
  );
};

export default PrivateRoute;

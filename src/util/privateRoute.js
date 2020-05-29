import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";

export const PrivateRoute = ({ component: Component, path, isDefaultPassword, ...rest}) => {
  return (
    <>
    {isDefaultPassword == 0 ? 
      <Route 
        {...rest} 
        render={({ match }) => <Component match={match} />}
      /> : 
      <Switch>
        <Redirect to="/profile" />
      </Switch>
    }
    </>
  )
};

export default PrivateRoute;
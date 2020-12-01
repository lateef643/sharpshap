import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";

export const PrivateRoute = ({
  component: Component,
  path,
  isDefaultPassword,
  routes,
  overviewData,
  ...rest
}) => {
  console.log(path);
  console.log(overviewData);
  return (
    <>
      {isDefaultPassword == 0 ? (
        <Route
          {...rest}
          render={({ match }) => (
            <Component
              routes={routes}
              match={match}
              overviewData={
                path === "/overview" || path === "/" ? overviewData : {}
              }
            />
          )}
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

//list all modal routes and render those with overlay

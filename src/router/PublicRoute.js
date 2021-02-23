import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import React from "react";

export const PublicRouter = ({
  isAuthenticated,
  component: Component,
  ...rest
}) => (
  <Route
    {...rest}
    component={(props) =>
      !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
    }
  />
);

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(PublicRouter);

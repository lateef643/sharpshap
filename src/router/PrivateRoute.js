import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { setDisplayModal } from "../actions/modal";

export const PrivateRoute = ({
  isAuthenticated,
  displayModal,
  component: Component,
  ...rest
}) => {
  useEffect(() => {
    displayModal({
      modal: false,
      overlay: false,
    });
  });

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

const mapDispatchToProps = (dispatch) => ({
  displayModal: (payload) => dispatch(setDisplayModal(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PrivateRoute);

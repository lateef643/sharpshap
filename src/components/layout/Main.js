import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import PrivateRoute from "../../util/privateRoute";
import Header from "./Header";
import Profile from "../../features/profile/Profile";
import routes from "../../routes/routes";

import styles from "./Main.module.scss";

export const Main = (props) => {
  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <Header />
      </header>
      <section className={styles.content}>
        <Switch>
          <Route path="/profile" component={Profile} />
          {routes.map((route, index) => {
            const Component = route.component;

            return (
              //This route shows the correct component if password is not default
              //else redirect to Profile route
              <PrivateRoute
                history={props.history}
                key={index}
                routes={route.routes}
                path={route.path}
                exact={route.exact}
                component={route.component}
                isDefaultPassword={props.isDefaultPassword}
              />
            );
          })}
        </Switch>
      </section>
    </main>
  );
};

const mapStateToProps = (state) => ({
  isDefaultPassword: state.auth.user.is_default,
});

export default connect(mapStateToProps)(Main);

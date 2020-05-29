import React from "react";
import { Route, Switch } from "react-router-dom";

import { connect } from "react-redux";
import PrivateRoute from "../../util/privateRoute";
import Header from "./Header";
import Profile from "../../components/content/profile/Profile";

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
          {props.routes.map((route, index) => {
            return (
              //This route shows the correct component if password is not default
              //else redirect to Profile route
              <PrivateRoute
                history={props.history}
                key={index}
                path={route.path}
                exact={route.exact}
                component={route.main}
                isDefaultPassword={props.isDefaultPassword}
              />
          )})}
        </Switch>         
      </section>
    </main>    
  )
}

const mapStateToProps = state => ({
  isDefaultPassword: state.auth.user.is_default
});

export default connect(mapStateToProps)(Main);
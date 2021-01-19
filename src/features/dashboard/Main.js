import React, { Suspense, useState, useEffect } from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import axios from "axios";

import { setWalletBalance } from "../../actions/wallet";

import { AGENT_DASHBOARD_DATA } from "../../utils/constants";

import Balance from "./Balance";
import PrivateRoute from "../../utils/privateRoute";
import Header from "./Header";
import Profile from "../profile/Profile";
import routes from "../../routes/routes";

import Overlay from "./Overlay";
import Modal from "./Modal";

import styles from "./Main.module.scss";

export const Main = ({
  history,
  isDefaultPassword,
  setWalletBalance,
  overlay,
}) => {
  const [overviewData, setOverviewData] = useState(null);
  const [loading, setLoading] = useState(true);

  async function fetchOverviewData() {
    try {
      const res = await axios.get(AGENT_DASHBOARD_DATA);

      const overviewData = res.data.data;

      setOverviewData(overviewData);
      setWalletBalance(overviewData.wallet.current_bal);
    } catch (e) {
      // console.log("an error occurred");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    let isCancelled;

    if (!isCancelled) {
      fetchOverviewData();
    }
  }, []);

  const refreshOverviewData = () => {
    fetchOverviewData();
  };

  return (
    <Suspense fallback={<div>this is loading the main page</div>}>
      <main className={styles.main}>
        <Header />
        <section
          className={
            overlay
              ? `${styles.content} ${styles.maxHeight}`
              : styles.contentContainer
          }
        >
          <div className={styles.content}>
            <Balance refreshOverviewData={refreshOverviewData} />
            <Switch>
              <Route path="/profile" component={Profile} />
              {routes.map((route, index) => {
                return (
                  //This route shows the correct component if password is not default
                  //else redirect to Profile route
                  <PrivateRoute
                    history={history}
                    key={index}
                    routes={route.routes}
                    overviewData={overviewData}
                    path={route.path}
                    exact={route.exact}
                    component={route.component}
                    isDefaultPassword={isDefaultPassword}
                    loading={loading}
                  />
                );
              })}
            </Switch>
            <Overlay />
            <Modal />
          </div>
        </section>
      </main>
    </Suspense>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    setWalletBalance: (payload) => dispatch(setWalletBalance(payload)),
  };
};

const mapStateToProps = (state) => ({
  isDefaultPassword: state.auth.user.is_default,
  overlay: state.modal.overlay,
});

export default connect(mapStateToProps, mapDispatchToProps)(Main);

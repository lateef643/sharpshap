import React, { Suspense, useState, useEffect } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';

import { setWalletBalance } from '../../actions/wallet';

import { AGENT_DASHBOARD_DATA } from '../../utils/constants';

import Header from './Header';
import Balance from './Balance';
import PrivateRoute from '../../utils/privateRoute';
import Profile from '../profile/Profile';
import routes from '../../routes/routes';

import Overlay from './modal/index';

import styles from './Main.module.scss';

const Main = ({ history, isDefaultPassword, dispatch, overlay }) => {
    const [overviewData, setOverviewData] = useState(null);
    const [loading, setLoading] = useState(true);

    async function fetchOverviewData() {
        try {
            const res = await axios.get(AGENT_DASHBOARD_DATA);

            const overviewData = res.data.data;

            setOverviewData(overviewData);
            dispatch(setWalletBalance(overviewData.wallet.current_bal));
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
                <div
                    className={
                        overlay
                            ? `${styles.content} ${styles.maxHeight}`
                            : styles.content
                    }
                >
                    <Balance refreshOverviewData={refreshOverviewData} />
                    <div className={styles.contentMain}>
                        <span
                            className={styles.back}
                            onClick={() => {
                                history.goBack();
                            }}
                        >
                            &#8592; back
                        </span>
                        <Switch>
                            <Route path='/profile' component={Profile} />
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
                    </div>
                    {overlay && <Overlay />}
                </div>
            </main>
        </Suspense>
    );
};

const mapStateToProps = (state) => ({
    isDefaultPassword: state.auth.user.is_default,
    overlay: state.modal.overlay,
});

export default withRouter(connect(mapStateToProps)(Main));

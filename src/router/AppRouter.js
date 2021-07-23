import React from 'react';
import { Switch } from 'react-router-dom';

import PublicRoute from '../router/PublicRoute';
import PrivateRoute from '../router/PrivateRoute';

import './AppRouter.scss';

import LoginPage from '../pages/Login';
import Landing from '../pages/Landing';
import ForgotPassword from '../pages/ForgotPassword';
import Dashboard from '../features/dashboard/index';
import Register from '../pages/createAgent/index';
import AppDashBoard from '../features/appDashboard/index';

export const AppRouter = () => {
    return (
        <Switch>
            <PublicRoute path='/forgot-password' component={ForgotPassword} />
            <PublicRoute path='/login' component={LoginPage} exact />
            {/* <PublicRoute path='/loginPage' component={LoginPage} exact /> */}
            <PublicRoute path='/register' component={Register} exact />
            {/* <PrivateRoute path='/' component={Dashboard} /> */}
            <PrivateRoute path='/' component={AppDashBoard} />
        </Switch>
    );
};

export default AppRouter;

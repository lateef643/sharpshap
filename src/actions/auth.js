import axios from 'axios';

import { LOGIN_API } from '../utils/constants';
import setAuthToken from '../utils/setAuthToken';
import setAxiosDefaults from '../utils/setAxiosDefaults';
import isEmpty from '../validation/isEmpty';
import history from '../utils/history';
import { setWalletBalance } from './wallet';

const loginUser = ({
    user,
    isAuthenticated,
    walletBalance,
    transactionSettings,
}) => {
    return {
        type: 'START_LOGIN_USER',
        payload: {
            isAuthenticated,
            user,
            walletBalance,
            transactionSettings,
        },
    };
};

export const startLoginUser = (payload) => (dispatch) => {
    return axios
        .post(LOGIN_API, payload)
        .then((res) => {
            const user = res.data.data.user;
            const token = res.data.data.token;
            const walletBalance = res.data.data.wallet.current_bal;
            const transactionSettings = res.data.data.settings;
            const agentClassification = res.data.data.class;
            const agent = res.data.data.data?.user?.agent
                ? res.data.data?.user?.agent
                : res.data.data.agent;
            const proprietor = res.data.data.user.proprietor;

            const { id, username, phone, email, is_default } = user;
            const {
                first_name: firstName,
                last_name: lastName,
                user_id: userId,
                business_name: businessName,
                wallet_no: walletNo,
                uuid,
                vfd_account_number,
                gender,
                business_address,
                date_of_birth,
                business_phone,
                account_name,
                account_number,
                bank_id,
                state_id,
                local_government_id,
                business_type,
                bvn,
                agent_code,
            } = agent;

            if (!isEmpty(user)) {
                const authDetails = {
                    isAuthenticated: true,
                    user: {
                        account_name,
                        account_number,
                        bank_id,
                        state_id,
                        local_government_id,
                        business_type,
                        agent_code,
                        id,
                        username,
                        phone,
                        email,
                        type: proprietor ? 'sub' : 'main',
                        uuid,
                        is_default,
                        business_address,
                        business_phone,
                        bvn,
                        firstName,
                        lastName,
                        vfd_account_number,
                        agentClassification,
                        userId,
                        date_of_birth,
                        gender,
                        businessName,
                        walletNo,
                    },
                    walletBalance,
                    transactionSettings,
                };

                setAuthToken(token);
                dispatch(loginUser(authDetails));
                dispatch(setWalletBalance(walletBalance));
                sessionStorage.setItem('user', JSON.stringify(authDetails));
                sessionStorage.setItem('token', token);
                sessionStorage.setItem('balance', walletBalance);
            }
        })
        .catch((err) => {
            if (err.response && err.response.status === 401) {
                dispatch({
                    type: 'SET_LOADING',
                    payload: {
                        loading: false,
                        message: 'Username or Password Incorrect',
                    },
                });
            } else {
                setTimeout(() => {
                    dispatch({
                        type: 'SET_LOADING',
                        payload: {
                            loading: false,
                            message: 'An error occurred',
                        },
                    });
                }, 4000);
            }
        });
};

export const logoutUser = () => {
    return {
        type: 'START_LOGOUT_USER',
    };
};

export const startLogout = () => (dispatch) => {
    dispatch({
        type: 'SET_LOADING',
        payload: {
            loading: false,
            message: undefined,
        },
    });

    sessionStorage.clear('user');
    sessionStorage.clear('token');
    sessionStorage.clear('balance');
    history.push('/');
    dispatch(logoutUser());
};

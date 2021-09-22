import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { connect } from 'react-redux';
import OtpInput from 'react-otp-input';
import { Link } from 'react-router-dom';
import { ThreeDots } from 'svg-loaders-react';
import { useToasts } from 'react-toast-notifications';
import { LOGIN_API, VERIFY_OTP } from '../utils/constants';
import { loginUser } from '../actions/auth';
import setAuthToken from '../utils/setAuthToken';
import isEmpty from '../validation/isEmpty';
import { setWalletBalance } from '../actions/wallet';

import NavHome from '../components/layout/HomeNavBar';

import styles from './Landing.module.scss';

export const Landing = ({ dispatch, message, loading }) => {
    const [formState, setFormState] = useState({
        phone: '',
        password: '',
    });
    const [otpState, setOtpState] = useState({
        otp: '',
    });
    const [otpLoading, setOtpLoading] = useState(false);
    const [status, setStatus] = useState('login');
    const { addToast } = useToasts();

    useEffect(() => {
        if (loading === false && message) {
            addToast(message, {
                appearance: 'error',
                autoDismiss: true,
            });

            dispatch({
                type: 'SET_LOADING',
                payload: {
                    loading: false,
                    message: undefined,
                },
            });
        }
    }, [message]);

    const handleOnSubmit = (e) => {
        e.preventDefault();
        const { phone, password } = formState;
        const payload = {
            user: {
                phone,
                password,
            },
            type: 'agent',
        };

        //Dispatching loading state to the error reducer to indicate loading while the
        //auth action in actions folder dispatches { loading: false, message: error }
        dispatch({
            type: 'SET_LOADING',
            payload: {
                loading: true,
                message: undefined,
            },
        });

        dispatch(startLoginUser(payload));
    };

    const handleOtpOnSubmit = (e) => {
        e.preventDefault();
        const { otp } = otpState;
        const payload = {
            otp,
        };

        setOtpLoading(true);

        (async function submitOtp() {
            try {
                const res = await axios.post(VERIFY_OTP, payload);

                addToast(res.data.message, {
                    appearance: 'success',
                    autoDismiss: true,
                });

                const user = JSON.parse(sessionStorage.getItem('user'));
                const authDetails = {
                    ...user,
                    isAuthenticated: true,
                };
                dispatch(loginUser(authDetails));

                sessionStorage.setItem('user', JSON.stringify(authDetails));
                setOtpLoading(false);
            } catch (err) {
                if (err.response && err.response.status === 401) {
                    setOtpLoading(false);
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                } else if (err.response && err.response.status === 422) {
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                    window.location = '/login';
                } else {
                    addToast(err.response.data.message, {
                        appearance: 'error',
                        autoDismiss: true,
                    });
                }
            }
        })();
    };

    const startLoginUser = (payload) => (dispatch) => {
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
                setStatus('otp');

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

                    addToast(
                        'Otp has been sent your email for you to enter below to proceed.',
                        {
                            appearance: 'success',
                            autoDismiss: true,
                        }
                    );
                    setAuthToken(token);
                    dispatch(loginUser(authDetails));
                    dispatch(setWalletBalance(walletBalance));
                    sessionStorage.setItem('user', JSON.stringify(authDetails));
                    sessionStorage.setItem('token', token);
                    sessionStorage.setItem('balance', walletBalance);
                    dispatch({
                        type: 'SET_LOADING',
                        payload: {
                            loading: false,
                            message: undefined,
                        },
                    });
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

    const handleOnChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value });
    };

    const handleOtpChange = ({ target }) => {
        setOtpState({ ...otpState, [target.name]: target.value });
    };

    return (
        <div className={styles.wrapper}>
            <NavHome theme='white' />
            <header className={styles.header}>
                <div className={styles.heading}>
                    <p className={styles.headingPrimary}>
                        Responsive, Relevant & Reliable Payments
                    </p>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.formContainer}>
                        {
                            {
                                login: (
                                    <form
                                        className={styles.form}
                                        onSubmit={handleOnSubmit}
                                    >
                                        <div className={styles.formGroup}>
                                            {/* <img className={styles.inputIcon} src={phoneIcon} alt="" /> */}
                                            <label
                                                htmlFor='phone'
                                                className={styles.label}
                                            >
                                                Phone number
                                            </label>
                                            <input
                                                name='phone'
                                                type='text'
                                                value={formState.phone.trim()}
                                                onChange={handleOnChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            {/* <img className={styles.inputIcon} src={lock} alt="" /> */}
                                            <label
                                                htmlFor='password'
                                                className={styles.label}
                                            >
                                                Password
                                            </label>
                                            <input
                                                name='password'
                                                value={formState.password}
                                                type='password'
                                                onChange={handleOnChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <div className={styles.formGroup}>
                                            <p
                                                className={
                                                    styles.forgotPassword
                                                }
                                            >
                                                <Link
                                                    to='/forgot-password'
                                                    className={
                                                        styles.forgotPasswordLink
                                                    }
                                                >
                                                    Forgot password?
                                                </Link>
                                            </p>
                                        </div>
                                        <button className={styles.button}>
                                            {loading ? <ThreeDots /> : 'Login'}
                                        </button>
                                        <p className={styles.register}>
                                            Don't have an account?
                                            <Link
                                                to='/register'
                                                className={styles.registerLink}
                                            >
                                                Register
                                            </Link>
                                        </p>
                                    </form>
                                ),
                                otp: (
                                    <form
                                        className={styles.form}
                                        onSubmit={handleOtpOnSubmit}
                                    >
                                        <div className={styles.formGroup}>
                                            <label
                                                htmlFor='phone'
                                                className={styles.label}
                                            >
                                                OTP
                                            </label>

                                            <input
                                                name='otp'
                                                value={otpState.otp}
                                                type='number'
                                                onChange={handleOtpChange}
                                                className={styles.input}
                                            />
                                        </div>
                                        <button
                                            className={styles.button}
                                            type='submit'
                                        >
                                            {otpLoading ? (
                                                <ThreeDots />
                                            ) : (
                                                'Submit'
                                            )}
                                        </button>
                                        <p className={styles.register}>
                                            OTP expires in 10 minutes.
                                        </p>
                                    </form>
                                ),
                            }[status]
                        }
                    </div>
                </div>
            </header>
        </div>
    );
};

Landing.propTypes = {
    // startLoginUser: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    message: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch: (payload) => dispatch(payload),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.error.loading,
        message: state.error.message,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Landing);

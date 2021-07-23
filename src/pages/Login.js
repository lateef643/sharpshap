import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';
import { ThreeDots } from 'svg-loaders-react';
import { useToasts } from 'react-toast-notifications';
import logoMain from '../assets/images/paydia.png';
import loginContainer from '../assets/images/loginContainer.svg';
import phoneIcon from '../assets/images/userIcon.svg';
import passwordIcon from '../assets/images/passwordIcon.svg';
import hanger from '../assets/images/Hanger.svg';
import hbBabnk from '../assets/images/HbBank.svg';
import pos from '../assets/images/pos.svg';

import { startLoginUser } from '../actions/auth';

import styles from './Login.module.scss';

const LoginPage = ({ dispatch, message, loading, startLoginUser }) => {
    const [formState, setFormState] = useState({
        phone: '',
        password: '',
        rememberMe: false,
    });
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

        startLoginUser(payload);
    };

    const handleOnChange = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.value });
    };

    const handleOnChangeCheck = ({ target }) => {
        setFormState({ ...formState, [target.name]: target.checked });
    };

    return (
        <section className={styles.wrapper}>
            <nav className={styles.navContainer}>
                <div className={styles.logoContainer}>
                    <NavLink to='/'>
                        <img className={styles.logo} src={logoMain} alt='' />
                    </NavLink>
                </div>
            </nav>
            <div className={styles.header}>
                <div className={styles.headingContainer}>
                    <div className={styles.heading}>
                        <p className={styles.headingPrimary}>Agents’ Portal</p>
                        <p className={styles.headingSecondary}>
                            ...payments simplified for your convinience...
                        </p>
                    </div>
                    <div className={styles.headingContainerImage}>
                        <img alt='' src={pos} />
                    </div>
                </div>

                <div className={styles.hanger}>
                    <img src={hanger} alt='' className={styles.hangerImage} />
                    <div className={styles.hangerInfo}>
                        <span className={styles.hangerInfoText}>By</span>
                        <img
                            src={hbBabnk}
                            alt=''
                            className={styles.hangerInfoImage}
                        />
                    </div>
                </div>
                <div className={styles.formSection}>
                    <div className={styles.loginContainer}>
                        <img
                            alt=''
                            src={loginContainer}
                            className={styles.loginContainer__img}
                        />
                    </div>
                    <div className={styles.form__wrapper}>
                        <form className={styles.form} onSubmit={handleOnSubmit}>
                            <div className={styles.formGroup}>
                                <img
                                    className={styles.inputIcon}
                                    src={phoneIcon}
                                    alt=''
                                />
                                <label htmlFor='phone' className={styles.label}>
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
                                <img
                                    className={styles.inputIcon}
                                    src={passwordIcon}
                                    alt=''
                                />
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
                                <div className={styles.checkContainer}>
                                    <span>
                                        <input
                                            type='checkbox'
                                            id='rememberMe'
                                            name='rememberMe'
                                            onChange={handleOnChangeCheck}
                                            className={styles.checkBox}
                                            checked={formState.rememberMe}
                                        />
                                        <label htmlFor={'rememberMe' || ''}>
                                            {''}
                                        </label>
                                    </span>
                                    <span className={styles.checkedLabel}>
                                        Keep me signed in
                                    </span>
                                </div>
                            </div>
                            <div className={styles.formGroup}>
                                <p className={styles.forgotPassword}>
                                    <Link
                                        to='/forgot-password'
                                        className={styles.forgotPasswordLink}
                                    >
                                        Forgot password?
                                    </Link>
                                </p>
                            </div>
                            <button className={styles.button}>
                                <span>
                                    {loading ? (
                                        <ThreeDots
                                            fill='#77b856'
                                            height='10px'
                                        />
                                    ) : (
                                        'Sign In'
                                    )}
                                </span>
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
                    </div>
                </div>
            </div>
        </section>
    );
};

LoginPage.propTypes = {
    startLoginUser: PropTypes.func.isRequired,
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    message: PropTypes.any,
};

const mapDispatchToProps = (dispatch) => {
    return {
        startLoginUser: (payload) => dispatch(startLoginUser(payload)),
        dispatch: (payload) => dispatch(payload),
    };
};

const mapStateToProps = (state) => {
    return {
        loading: state.error.loading,
        message: state.error.message,
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);

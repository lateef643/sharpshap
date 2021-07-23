import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useToasts } from 'react-toast-notifications';

import { startLogout } from '../../actions/auth';
import { createNotification } from '../../actions/notification';
import notification from '../../assets/images/notificationNew.svg';
import user from '../../assets/images/user.svg';
import userNew from '../../assets/images/userNew.svg';
import arrowdown from '../../assets/images/PolygonNew.svg';
import right from '../../assets/icons/arrowright.svg';
import lock from '../../assets/icons/lock.svg';
import users from '../../assets/icons/users.svg';
import bioUser from '../../assets/icons/bio-user.svg';
import exit from '../../assets/icons/exit.svg';
import pinLock from '../../assets/icons/pin.svg';
import flexShield from '../../assets/icons/bronze-badge.svg';
import premiumShield from '../../assets/icons/silver-badge.svg';
import vipShield from '../../assets/icons/gold-badge.svg';
import logoMain from '../../assets/images/paydia.png';

import styles from './Header.module.scss';

const Header = ({
    isDefaultPassword,
    notifications,
    createNotification,
    name,
    walletId,
    logout,
    agentType,
    agentClassification,
    vfdAccountNumber,
}) => {
    const [toggleUser, setToggleUser] = useState(false);
    const { addToast } = useToasts();
    const agentClassificationLowercase = agentClassification.toLowerCase();
    const agentClassificationIcon =
        agentClassificationLowercase === 'premium'
            ? premiumShield
            : agentClassificationLowercase === 'vip'
            ? vipShield
            : flexShield;

    useEffect(() => {
        let isCancelled;

        if (!isCancelled) {
            if (isDefaultPassword == 1) {
                createNotification({
                    title: 'Password',
                    body: 'Please create a new password to continue',
                });
            }
        }

        return () => {
            isCancelled = true;
        };
    }, []);

    const handleToggleNotifications = () => {
        notifications.forEach((notification) => {
            addToast(notification.body, {
                appearance: 'info',
                autoDismiss: false,
            });
        });
    };
    return (
        <header className={styles.header}>
            <div className={styles.container}>
                <div className={styles.logoContainer}>
                    <a
                        href='/https://agents.paydia.ng'
                        target='_blank'
                        rel='noopener noreferrer'
                    >
                        <img src={logoMain} alt='App Logo' />
                    </a>
                </div>
                <nav className={styles.navContainer}>
                    <NavLink
                        to='/overview'
                        className={styles.navItem}
                        activeClassName={styles.active}
                    >
                        <p className={styles.navItemText}>Overview</p>
                    </NavLink>
                    <NavLink
                        to='/wallet'
                        className={styles.navItem}
                        activeClassName={styles.active}
                    >
                        <span className={styles.navItemText}>My Wallet</span>
                    </NavLink>
                    <NavLink
                        to='/transactions'
                        className={styles.navItem}
                        activeClassName={styles.active}
                    >
                        <span className={styles.navItemText}>Transactions</span>
                    </NavLink>
                    {agentType !== 'sub' && (
                        <NavLink
                            to='/users'
                            className={styles.navItem}
                            activeClassName={styles.active}
                        >
                            <p className={styles.navItemText}>Users</p>
                        </NavLink>
                    )}

                    <NavLink
                        to='/contact-us'
                        className={styles.navItem}
                        activeClassName={styles.active}
                    >
                        <p className={styles.navItemText}>Support</p>
                    </NavLink>
                </nav>
                <div
                    className={styles.notification}
                    onClick={handleToggleNotifications}
                >
                    <img src={notification} alt='notification bell' />
                    <span className={styles.active}>
                        {notifications.length}
                    </span>
                </div>
                <div className={styles.profile}>
                    <img
                        className={styles.profileImage}
                        src={userNew}
                        alt='User silhoutte'
                        onClick={() => {
                            setToggleUser(!toggleUser);
                        }}
                    />
                    <img
                        src={arrowdown}
                        className={styles.profileToggle}
                        onClick={() => {
                            setToggleUser(!toggleUser);
                        }}
                        alt=''
                    />
                    <img
                        src={agentClassificationIcon}
                        alt=''
                        className={styles.agentCategory}
                    />
                    {toggleUser && (
                        <div className={styles.userSubmenu}>
                            <div className={styles.userSubmenuBio}>
                                <img
                                    src={user}
                                    alt='user avatar'
                                    className={styles.userSubmenuBioAvatar}
                                />
                                <span className={styles.userSubmenuBioService}>
                                    {name}
                                    <img
                                        className={styles.userSubmenuBioBadge}
                                        src={agentClassificationIcon}
                                        alt=''
                                    />
                                </span>
                                <span className={styles.userSubmenuBioWallet}>
                                    Wallet ID: {walletId}
                                </span>
                                <span className={styles.userSubmenuBioWallet}>
                                    VFD Account No: {vfdAccountNumber}
                                </span>
                            </div>
                            <div className={styles.userSubmenuMain}>
                                <Link
                                    to='/profile'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={pinLock}
                                        alt=''
                                    />
                                    <span>Update transaction pin</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <Link
                                    to='/profile'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={bioUser}
                                        alt=''
                                    />
                                    <span>Edit Profile</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <Link
                                    to='users'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={users}
                                        alt=''
                                    />
                                    <span>Users</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <Link
                                    to='Profile'
                                    className={styles.userSubmenuMainItem}
                                >
                                    <img
                                        className={styles.icon}
                                        src={lock}
                                        alt=''
                                    />
                                    <span>Change Password</span>
                                    <img
                                        className={styles.arrow}
                                        src={right}
                                        alt=''
                                    />
                                </Link>
                                <div
                                    className={`${styles.userSubmenuMainItem} ${styles.logout}`}
                                    aria-label='button'
                                    onClick={() => {
                                        logout();
                                    }}
                                >
                                    <img
                                        className={styles.icon}
                                        src={exit}
                                        alt=''
                                    />
                                    <span
                                        className={`${styles.submenuItemText} ${styles.logoutText}`}
                                    >
                                        Logout
                                    </span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
};

const mapStateToProps = (state) => ({
    currentPage: state.page,
    isDefaultPassword: state.auth.user.is_default,
    notifications: state.notification.notifications,
    walletId: state.auth.user.walletNo,
    name: `${state.auth.user.firstName} ${state.auth.user.lastName}`,
    agentClassification: state.auth.user.agentClassification,
    vfdAccountNumber: state.auth.user.vfd_account_number,
    agentType: state.auth.user.type,
});

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(startLogout()),
        createNotification: (payload) => dispatch(createNotification(payload)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);

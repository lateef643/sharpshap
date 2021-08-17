import React, { useState } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import flexShield from '../../assets/icons/bronze-badge.svg';
import premiumShield from '../../assets//images/premiumSvg.svg';
import vipShield from '../../assets/icons/gold-badge.svg';
import balanceBg from '../../assets/images/balanceBg.svg';

import formatToCurrency from '../../utils/formatToCurrency';
import refresh from '../../assets/images/sync.svg';

import styles from './Balance.module.scss';
import { render } from '@testing-library/react';
import { format } from "date-fns";



const Balance = ({
    name,
    walletNo,
    account_number,
    walletBalance,
    vfdAccountNumber,
    refreshOverviewData,
    agentClassification,
}) => {
    const agentClassificationLowercase = agentClassification.toLowerCase();
    const agentClassificationIcon =
        agentClassificationLowercase === 'premium'
            ? premiumShield
            : agentClassificationLowercase === 'vip'
            ? vipShield
            : flexShield;
    const agentClassificationText =
        agentClassificationLowercase === 'premium'
            ? 'Premium Agent'
            : agentClassificationLowercase === 'vip'
            ? 'VIP Agent'
            : 'Flex Agent';

    const handleOnClick = () => {
        refreshOverviewData();
    };
    const [showBalance, setShowBalance] = useState(false)


   
        return (
            <div className={styles.balanceContainer}>
                <div
                    className={styles.balance}
                    style={{
                        backgroundImage: 'url(' + balanceBg + ')',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: 'cover',
                    }}
                >
                    <div className={styles.balanceWrapper}>
                        <p className={styles.balanceHeading}>Welcome!</p>
                        <h3 className={styles.balanceText}>{name}</h3>
                    </div>
                    <div className={styles.agentCategory}>
                        <img
                            className={styles.agentCategoryImage}
                            src={agentClassificationIcon}
                            alt=''
                        />
                        <p className={styles.agentCategoryText}>
                            {agentClassificationText}
                        </p>
                    </div>
                </div>
                <div className={`${styles.balance} ${styles.wallet}`}>
                    <div className={styles.walletInfo}>
                        <p className={styles.balanceHeading}>Nuban Acc No</p>
                        <h3 className={styles.wallet_Text}>
                            {vfdAccountNumber ? vfdAccountNumber : '----'}
                        </h3>
                    </div>
                    <div className={styles.balanceWrapper}>
                        <p
                            className={`${styles.balanceHeading} ${styles.walletHeading}`}
                        >
                            Wallet Balance
                        </p>
                        <h3 className={styles.wallet_Text}>
                            {showBalance ?  "*****" : `₦${formatToCurrency(walletBalance)}` }
                            <img
                                className={styles.refresh}
                                src={refresh}
                                alt=''
                                onClick={handleOnClick}
                            />
                        </h3>
                        <button className={styles.walletButton} onClick={() => setShowBalance(!showBalance)}> {showBalance ?  "Show Balance" : "Hide Balance" } </button>
    
                        <Link to='/wallet/log' style={{ textDecoration: 'none' }}>
                            <h3
                                className={styles.walletHistory}
                                arial-label='button'
                            >
                                Wallet history
                            </h3>
                        </Link>
    
                        <p
                            className={`${styles.balanceHeading} ${styles.walletHeading}`}
                        >
                            Wallet No
                        </p>
                        <h6 className={styles.wallet_id}>{walletNo}</h6>
                    </div>
                </div>
            </div>
        );
    

   
};
    
    


const mapStateToProps = (state) => {
    return {
        walletBalance: state.wallet.balance,
        agentClassification: state.auth.user.agentClassification,
        name: `${state.auth.user.firstName} ${state.auth.user.lastName}`,
        walletNo: state.auth.user.walletNo,
        account_number: state.auth.user.account_number,
        vfdAccountNumber: state.auth.user.vfd_account_number,
    };
};

export default connect(mapStateToProps)(Balance);

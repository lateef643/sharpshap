import React from 'react';
import { connect } from 'react-redux';

import flexShield from '../../assets/icons/bronze-badge.svg';
import premiumShield from '../../assets//images/premiumSvg.svg';
import vipShield from '../../assets/icons/gold-badge.svg';
import balanceBg from '../../assets/images/balanceBg.svg';

import formatToCurrency from '../../utils/formatToCurrency';
import refresh from '../../assets/images/sync.svg';

import styles from './Balance.module.scss';

const Balance = ({
    name,
    walletNo,
    account_number,
    walletBalance,
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
                    <p className={styles.balanceHeading}>Wallet No</p>
                    <h3 className={styles.wallet_Text}>{walletNo}</h3>
                    <p className={styles.balanceHeading}>Nuban Acc No</p>
                    <h3 className={styles.wallet_Text}>{account_number}</h3>
                </div>
                <div className={styles.balanceWrapper}>
                    <p
                        className={`${styles.balanceHeading} ${styles.walletHeading}`}
                    >
                        Wallet Balance
                    </p>
                    <h3 className={styles.wallet_Text}>
                        ₦{formatToCurrency(walletBalance)}
                        <img
                            className={styles.refresh}
                            src={refresh}
                            alt=''
                            onClick={handleOnClick}
                        />
                    </h3>
                    <h3 className={styles.walletHistory} arial-label='button'>
                        Wallet history
                    </h3>
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
    };
};

export default connect(mapStateToProps)(Balance);

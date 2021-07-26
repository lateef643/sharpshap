import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Chart from 'chart.js';
import { ThreeDots } from 'svg-loaders-react';

import { setDisplayModal } from '../actions/modal';

import { setCurrentPage } from '../actions/page';
import bills from '../assets/images/billSvg.svg';
import transfer from '../assets/images/transferSvg.svg';
import betting from '../assets/images/Poker.svg';
import loan from '../assets/images/loanSvg.svg';
import airtime from '../assets/images/airtime.svg';
import formatToCurrency from '../utils/formatToCurrency';

import styles from './Overview.module.scss';

export const Overview = ({
    changeCurrentPage,
    loading,
    displayModal,
    overviewData,
}) => {
    const days = [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
    ];
    const months = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const dayShort = ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun'];
    const monthShort = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    const [transactionVolumeDataToDisplay, setTransactionVolumeDateToDisplay] =
        useState('month');
    // const [transactionVolumeData, setTransactionVolumeData] = useState(null);
    const transactionVolumeDataMonthly = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const transactionVolumeDataDaily = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const barChartData = {
        labels:
            transactionVolumeDataToDisplay === 'month' ? monthShort : dayShort,
        datasets: [
            {
                backgroundColor: '#3E215B',
                data:
                    transactionVolumeDataToDisplay === 'month'
                        ? transactionVolumeDataMonthly
                        : transactionVolumeDataDaily,
                maxBarThickness: 28,
            },
        ],
    };

    const deviceWidth = window.innerWidth;

    const getTransactionVolumeDataDaily = () => {
        if (
            overviewData !== null &&
            overviewData.chart.weekly.data.length > 0
        ) {
            const dailyTransactionVolumeInfo = overviewData.chart.weekly.data;

            days.forEach((day, index) => {
                dailyTransactionVolumeInfo.forEach((dayInfo) => {
                    if (day === dayInfo.day) {
                        transactionVolumeDataDaily[index] = dayInfo.volume;
                    }
                });
            });
        }
    };

    const getTransactionVolumeDataMonthly = () => {
        if (
            overviewData !== null &&
            overviewData.chart.monthly.data.length > 0
        ) {
            const monthlyTransactionVolumeInfo =
                overviewData.chart.monthly.data;

            months.forEach((month, index) => {
                monthlyTransactionVolumeInfo.forEach((monthInfo) => {
                    if (month === monthInfo.month) {
                        transactionVolumeDataMonthly[index] = monthInfo.volume;
                    }
                });
            });
        }
    };

    useEffect(() => {
        getTransactionVolumeDataDaily();
        getTransactionVolumeDataMonthly();
    }, [overviewData]);

    useEffect(() => {
        Chart.defaults.global.defaultFontFamily = 'Nunito';

        window.onload = function () {
            var ctx = document.getElementById('canvas').getContext('2d');
            if (window.myBar) window.myBar.destroy();
            window.myBar = new Chart(ctx, {
                type: 'bar',
                data: barChartData,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    tooltips: {
                        callbacks: {
                            label: function (tooltipItem, data) {
                                return `₦${tooltipItem.yLabel
                                    .toString()
                                    .replace(
                                        /(\d)(?=(\d{3})+(?!\d))/g,
                                        '$1,'
                                    )}`;
                            },
                        },
                    },
                    scales: {
                        xAxes: [
                            {
                                gridLines: {
                                    color: 'rgba(0, 0, 0, 0)',
                                },
                                ticks: {
                                    fontSize: deviceWidth > 600 ? 13 : 12,
                                },
                            },
                        ],
                        yAxes: [
                            {
                                gridLines: {
                                    color: 'rgba(0, 0, 0, 0)',
                                },
                                ticks: {
                                    fontSize: deviceWidth > 600 ? 13.5 : 12,
                                    fontFamily: 'sans-serif',
                                    callback: function (label, index, labels) {
                                        let prefix;
                                        let suffix;

                                        if (label > 999999999) {
                                            suffix = 'B';
                                            prefix = label / 1000000000;
                                        } else if (label > 999999) {
                                            suffix = 'M';
                                            prefix = label / 1000000;
                                        } else if (label > 999) {
                                            suffix = 'K';
                                            prefix = label / 1000;
                                        } else {
                                            suffix = '';
                                            prefix = label;
                                        }

                                        if (deviceWidth < 600) {
                                            return `₦${prefix + suffix}`;
                                        } else {
                                            return `₦${label
                                                .toString()
                                                .replace(
                                                    /(\d)(?=(\d{3})+(?!\d))/g,
                                                    '$1,'
                                                )}`;
                                        }
                                    },
                                },
                            },
                        ],
                    },
                    responsive: true,
                    legend: {
                        display: false,
                    },
                    title: {
                        display: true,
                        position: 'bottom',
                        text: 'Transaction Volume',
                        fontSize: deviceWidth > 600 ? 16 : 14,
                        fontFamily: "'Lato', sans-serif",
                    },
                },
            });
        };

        window.onload();
    }, [overviewData]);

    useEffect(() => {
        changeCurrentPage({
            heading: 'Overview',
            search: true,
        });
    }, [changeCurrentPage]);

    const handleTransactionVolumeDateToDisplayChange = (e) => {
        const value = e.target.value;

        setTransactionVolumeDateToDisplay(value);
    };

    return (
        <div className={styles.container}>
            <div className={styles.services}>
                <Link
                    to='/transfer'
                    className={`${styles.card} ${styles.cardTransfer}`}
                    onClick={(e) => {
                        e.preventDefault();

                        displayModal({
                            overlay: true,
                            modal: 'fundsTransfer',
                        });
                    }}
                >
                    <div className={styles.container}>
                        <div
                            className={`${styles.cardImageContainer} ${styles.cardImageContainerTransfer}`}
                        >
                            <img
                                src={transfer}
                                className={styles.image}
                                alt='card icon'
                            />
                        </div>
                        <p className={`${styles.text} ${styles.textTransfer}`}>
                            Transfer
                        </p>
                    </div>
                </Link>
                <Link
                    to='/bill-payment'
                    className={`${styles.card} ${styles.cardBill}`}
                >
                    <div className={styles.container}>
                        <div
                            className={`${styles.cardImageContainer} ${styles.cardImageContainerBill}`}
                        >
                            <img
                                src={bills}
                                className={styles.image}
                                alt='card icon'
                            />
                        </div>
                        <p className={`${styles.text} ${styles.textBill}`}>
                            Bill Payment
                        </p>
                    </div>
                </Link>
                <Link
                    to='/airtime-data'
                    className={`${styles.card} ${styles.cardAirtime}`}
                >
                    <div className={styles.container}>
                        <div
                            className={`${styles.cardImageContainer} ${styles.cardImageContainerAirtime}`}
                        >
                            <img
                                src={airtime}
                                className={styles.image}
                                alt='card icon'
                            />
                        </div>
                        <p className={`${styles.text} ${styles.textAirtime}`}>
                            Airtime & Data
                        </p>
                    </div>
                </Link>
                <Link
                    to='/betting'
                    className={`${styles.card} ${styles.cardBetting}`}
                >
                    <div className={styles.container}>
                        <div
                            className={`${styles.cardImageContainer} ${styles.cardImageContainerBetting}`}
                        >
                            <img
                                src={betting}
                                className={styles.image}
                                alt='card icon'
                            />
                        </div>
                        <p className={`${styles.text} ${styles.textBetting}`}>
                            Betting
                        </p>
                    </div>
                </Link>
                <Link
                    to='/loan'
                    className={`${styles.card} ${styles.cardCash} ${styles.cardDisabled}`}
                >
                    <div className={styles.container}>
                        <div
                            className={`${styles.cardImageContainer} ${styles.cardImageContainerCash}`}
                        >
                            <img
                                src={loan}
                                className={styles.image}
                                alt='card icon'
                            />
                        </div>
                        <p className={`${styles.text} ${styles.textCash}`}>
                            Loan
                        </p>
                    </div>
                </Link>
            </div>
            <div className={styles.content}>
                <div className={styles.transactions}>
                    {overviewData !== null &&
                    overviewData.transaction.length > 0 &&
                    !loading ? (
                        <>
                            <div className={styles.transactionsHeading}>
                                <h3 className={styles.transactionsHeadingText}>
                                    Recent transactions
                                </h3>
                                <Link
                                    to='/transactions'
                                    className={styles.transactionsHeadingLink}
                                >
                                    View all
                                </Link>
                            </div>

                            <div className={styles.transactionsItem}>
                                <p className={styles.sn}>S/N</p>
                                <p className={styles.date}>Date</p>
                                <p className={styles.description}>
                                    Description
                                </p>
                                <p
                                    className={`${styles.amount} ${styles.amountHeader}`}
                                >
                                    Amount
                                </p>
                            </div>
                            {overviewData.transaction.map((data, index) => {
                                const date = new Date(
                                    data.transaction_date
                                ).toDateString();
                                const formattedDate = date.slice(4, 11);
                                const { amount, type, status } = data;

                                return (
                                    <div className={styles.transactionsItem}>
                                        <p className={styles.sn}>{++index}.</p>
                                        <p className={styles.date}>
                                            {formattedDate}
                                        </p>
                                        <p className={styles.description}>
                                            {type
                                                ? `${type?.toLowerCase()}`
                                                : `nil/${status}`}
                                        </p>
                                        <p className={styles.amount}>
                                            ₦{formatToCurrency(amount)}
                                        </p>
                                    </div>
                                );
                            })}
                        </>
                    ) : loading ? (
                        <ThreeDots fill='#3e215b' />
                    ) : (
                        <div className={styles.noTransactions}>
                            No transactions to display
                        </div>
                    )}
                </div>
                <div className={styles.chartContainer}>
                    <select
                        className={styles.sortBy}
                        onChange={handleTransactionVolumeDateToDisplayChange}
                    >
                        <option value='month'>Monthly</option>
                        <option value='day'>Daily</option>
                    </select>
                    <canvas
                        id='canvas'
                        className={styles.canvas}
                        width='200'
                        height={deviceWidth > 600 ? '120' : '180'}
                    ></canvas>
                </div>
            </div>
        </div>
    );
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
        displayModal: (payload) => dispatch(setDisplayModal(payload)),
    };
};

export default connect(undefined, mapDispatchToProps)(Overview);

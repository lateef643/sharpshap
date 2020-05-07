import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { AGENT_DASHBOARD_DATA } from "../../store/api/constants";
import Card from "../shared/Card";
import styles from "./Dashboard.module.scss";
import cabletv from "../../assets/images/cabletv.svg";
import power from "../../assets/images/electricity.svg";
import transfer from "../../assets/images/transfer-outlined.svg";
import data from "../../assets/images/internet-phone.svg";
import insurance from "../../assets/images/insurance-outlined.svg";
import airtime from "../../assets/images/phone-svgrepo-com.svg";
import books from "../../assets/images/books-outline.svg";
import wallet from "../../assets/images/wallet-outline.svg";
import Chart from "chart.js";
import { setCurrentPage } from "../../actions/page";

export const Dashboard = ({ changeCurrentPage }) => {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']; 
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const [transactionVolumeDataToDisplay, setTransactionVolumeDateToDisplay] = useState('month');
  const [transactionVolumeData, setTransactionVolumeData] = useState(null);
  const [transactionVolumeDataMonthly, setTransactionVolumeDataMonthly] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const [transactionVolumeDataDaily, setTransactionVolumeDataDaily] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const barChartData = {
    labels: transactionVolumeDataToDisplay === 'month' ? months : days,
    datasets: [{
      backgroundColor: '#2A58AE',
      data: transactionVolumeDataToDisplay === 'month' ? transactionVolumeDataMonthly : transactionVolumeDataDaily,
      maxBarThickness: 28,
    }]
  };

  const getTransactionVolumeDataDaily = () => {
    if (transactionVolumeData !== null && transactionVolumeData.weekly.data.length > 0) {
      const dailyTransactionVolumeInfo = transactionVolumeData.weekly.data;

      days.forEach((day, index)=> {
          dailyTransactionVolumeInfo.forEach(dayInfo => {
            if (day === dayInfo.day) {
              transactionVolumeDataDaily[index] = dayInfo.volume;
            }
          })
        })      
    }
  };

  const getTransactionVolumeDataMonthly = () => {
    if (transactionVolumeData !== null && transactionVolumeData.monthly.data.length > 0) {
      const monthlyTransactionVolumeInfo = transactionVolumeData.monthly.data;

      months.forEach((month, index)=> {
          monthlyTransactionVolumeInfo.forEach(monthInfo => {
            if (month === monthInfo.month) {
              transactionVolumeDataMonthly[index] = monthInfo.volume;
            }
          })
        })      
    }
  };

  useEffect(() => {
    (async () => {
      const res = await axios.get(AGENT_DASHBOARD_DATA);
      const transactionVolume = res.data.data;
      setTransactionVolumeData(transactionVolume);
    })();
  }, []);

  useEffect(() => {
    getTransactionVolumeDataDaily();
    getTransactionVolumeDataMonthly();
  }, [transactionVolumeData]);

  useEffect(() => {
    Chart.defaults.global.defaultFontFamily = "Lato";

    window.onload = function() {
      var ctx = document.getElementById('canvas').getContext('2d');
      if (window.myBar) window.myBar.destroy();
      window.myBar = new Chart(ctx, {
        type: 'bar',
        data: barChartData,
        options: {
          tooltips: {
            callbacks: {
              label: function(tooltipItem, data) {
                  return `₦${tooltipItem.yLabel.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
              }
            }
          },
          scales: {
              xAxes: [{
                  gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                  },
                  ticks: {
                    fontSize: 13
                  }
              }],
              yAxes: [{
                  gridLines: {
                      color: "rgba(0, 0, 0, 0)",
                  } ,
                  ticks: {
                    fontSize: 13.5,
                    fontFamily: 'sans-serif',
                    callback: function(label, index, labels) {
                        return `₦${label.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}`;
                    }
                }  
              }]
          },
          responsive: true,
          legend: {
            display: false
          },
          title: {
            display: true,
            position: 'bottom',
            text: 'Transaction Volume',
            fontSize: 16,
            fontFamily: "'Lato', sans-serif"
          }
        }
      });
    };

    window.onload();
  })

  useEffect(() => {
    changeCurrentPage({
      heading: "Dashboard",
      search: true
    });    
  }, [changeCurrentPage]);

  const handleTransactionVolumeDateToDisplayChange = (e) => {
    const value = e.target.value;

    if (value === 'month') {
      setTransactionVolumeDataDaily([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    };

    if (value === 'day') {
      setTransactionVolumeDataMonthly([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,]);
    };

    setTransactionVolumeDateToDisplay(value);
  };
  
  return (
  <div className={styles.container}>
    <div className={styles.cardContainer}>
      <Card link="transfer" text="Transfer Funds" image={transfer} />
      <Card link="recharge-cable" text="Recharge Cable" image={cabletv} />
      <Card link="buy-data" text="Buy Data" image={data} />
      <Card link="buy-airtime" text="Buy Airtime" image={airtime} />
      <Card link="pay-electricity" text="Pay Electricity" image={power} />
      <Card link="buy-insurance" text="Buy Insurance" image={insurance}  />
      <Card link="education" text="Education" image={books} />
      <Card link="wallet-transfer" text="Wallet Transfer" image={wallet} />
    </div>
    <div className={styles.chartContainer}>
      <select className={styles.sortBy} onChange={handleTransactionVolumeDateToDisplayChange}>
        <option value="month">Monthly</option>
        <option value="day">Daily</option>
      </select>
      <canvas id="canvas" className={styles.canvas} width="200" height="120" ></canvas>
    </div>
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(Dashboard);
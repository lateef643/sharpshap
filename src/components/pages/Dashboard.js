import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { AGENT_DASHBOARD_DATA } from "../../store/api/constants";
import Card from "../shared/Card";
import styles from "./Dashboard.module.scss";
import bills from "../../assets/images/bills.svg";
import transfer from "../../assets/images/transfer-outlined.svg";
import sim from "../../assets/images/sim.svg";
import football from "../../assets/images/football.svg";
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

    setTransactionVolumeDateToDisplay(value);
  };
  
  return (
  <div className={styles.container}>
    <div className={styles.cardContainer}>
      <Card link="transfer" text="Transfer Funds" size="small" image={transfer} />
      <Card link="bill-payment" text="Bill Payment" size="small" image={bills} />
      <Card link="airtime-data" text="Airtime & Data" size="small" image={sim} />
      <Card link="betting" text="Betting" size="small" image={football} />
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
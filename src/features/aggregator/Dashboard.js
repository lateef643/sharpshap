import React, { useState, useEffect } from "react";
import Chart from "chart.js";
import Axios from "axios";

import { AGGREGATOR_DASHBOARD, GET_SUB_AGENTS } from "../utils/constants";
import formatToCurrency from "../utils/formatToCurrency";
import bal from "../assets/images/bills.svg";
import styles from "./Dashboard.module.scss";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [agentListData, setAgentListData] = useState(null);

  const months = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
  ];

  const barChartData = {
    labels: months,
    datasets: [
      {
        backgroundColor: "#2A58AE",
        data: [
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
          0,
        ],
        maxBarThickness: 28,
      },
    ],
  };

  const deviceWidth = window.innerWidth;

  useEffect(() => {
    let isCancelled = false;

    const getDashboardRequest = Axios.get(AGGREGATOR_DASHBOARD);
    const getAgentList = Axios.get(GET_SUB_AGENTS);

    Axios.all([getDashboardRequest, getAgentList])
      .then(
        Axios.spread((...responses) => {
          const dashboardData = responses[0];
          const agentListData = responses[1];

          if (!isCancelled) {
            setDashboardData(dashboardData.data.data);
            setAgentListData(agentListData.data.data.splice(0, 5));
          }
        })
      )
      .catch((e) => {
        // console.log(e);
      });

    return () => {
      isCancelled = true;
    };
  }, []);

  useEffect(() => {
    Chart.defaults.global.defaultFontFamily = "Avenir";

    window.onload = function () {
      var ctx = document.getElementById("canvas").getContext("2d");
      if (window.myBar) window.myBar.destroy();
      window.myBar = new Chart(ctx, {
        type: "bar",
        data: barChartData,
        options: {
          tooltips: {
            callbacks: {
              label: function (tooltipItem, data) {
                return `₦${tooltipItem.yLabel
                  .toString()
                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
              },
            },
          },
          scales: {
            xAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  fontSize: 13,
                  fontFamily: "Avenir",
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  color: "rgba(0, 0, 0, 0)",
                },
                ticks: {
                  fontSize: 13,
                  fontFamily: "'Avenir', sans-serif",

                  callback: function (label, index, labels) {
                    let prefix;
                    let suffix;

                    if (label > 999999999) {
                      suffix = "B";
                      prefix = label / 1000000000;
                    } else if (label > 999999) {
                      suffix = "M";
                      prefix = label / 1000000;
                    } else if (label > 999) {
                      suffix = "K";
                      prefix = label / 1000;
                    } else {
                      suffix = "";
                      prefix = label;
                    }

                    if (deviceWidth < 600) {
                      return `₦${prefix + suffix}`;
                    } else {
                      return `₦${label
                        .toString()
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")}`;
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
            position: "bottom",
            text: "Commission History",
            fontSize: 15,
            fontFamily: "Avenir",
          },
        },
      });
    };

    window.onload();
  });

  return (
    <div className={styles.dashboard}>
      <div className={styles.balance}>
        <div className={styles.balanceItem}>
          <div className={styles.content}>
            <p className={styles.balanceHeader}>Total Commission</p>
            <p className={styles.balanceBody}>
              {dashboardData
                ? formatToCurrency(dashboardData.earnings)
                : formatToCurrency(0)}
            </p>
          </div>
          <div className={styles.balanceImg}>
            <img src={bal} alt="" />
          </div>
        </div>
        <div className={styles.balanceItem}>
          <div className={styles.content}>
            <p className={styles.balanceHeader}>Commission Balance</p>
            <p className={styles.balanceBody}>
              {dashboardData
                ? formatToCurrency(dashboardData.earnings)
                : formatToCurrency(0)}
            </p>
          </div>
          <div className={styles.balanceImg}>
            <img src={bal} alt="" />
          </div>
        </div>
      </div>
      <section className={styles.chart}>
        <canvas
          id="canvas"
          className={styles.canvas}
          width="150"
          height="55"
        ></canvas>
      </section>
      <div className={styles.list}>
        <h3>Agent List</h3>
        {agentListData && agentListData.length > 0 ? (
          <table className={styles.table}>
            <thead className={styles.tableHead}>
              <tr className={styles.tableRow}>
                <th>Status</th>
                <th>Agent ID</th>
                <th>Business Name</th>
                <th>Phone Number</th>
                <th>Terminal ID</th>
                <th>Serial Number</th>
                <th>Date Created</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className={styles.tableBody}>
              <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                <td>
                  <span className={styles.status}></span>
                </td>
                <td>CI/AGT/LA/81840640</td>
                <td>Tola Enterprises</td>
                <td>08064829451</td>
                <td>CICO2345678</td>
                <td>35648983989099</td>
                <td>2020-06-27 19:23:35</td>
                <td></td>
              </tr>
              <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                <td>
                  <span className={styles.status}></span>
                </td>
                <td>CI/AGT/LA/81840640</td>
                <td>Tola Enterprises</td>
                <td>08064829451</td>
                <td>CICO2345678</td>
                <td>35648983989099</td>
                <td>2020-06-27 19:23:35</td>
                <td></td>
              </tr>
              <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                <td>
                  <span className={styles.status}></span>
                </td>
                <td>CI/AGT/LA/81840640</td>
                <td>Tola Enterprises</td>
                <td>08064829451</td>
                <td>CICO2345678</td>
                <td>35648983989099</td>
                <td>2020-06-27 19:23:35</td>
                <td></td>
              </tr>
              <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                <td>
                  <span className={styles.status}></span>
                </td>
                <td>CI/AGT/LA/81840640</td>
                <td>Tola Enterprises</td>
                <td>08064829451</td>
                <td>CICO2345678</td>
                <td>35648983989099</td>
                <td>2020-06-27 19:23:35</td>
                <td></td>
              </tr>
              <tr className={`${styles.tableBodyRow} ${styles.tableRow}`}>
                <td>
                  <span className={styles.status}></span>
                </td>
                <td>CI/AGT/LA/81840640</td>
                <td>Tola Enterprises</td>
                <td>08064829451</td>
                <td>CICO2345678</td>
                <td>35648983989099</td>
                <td>2020-06-27 19:23:35</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        ) : (
          <p className={styles.notFound}>No agents found.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

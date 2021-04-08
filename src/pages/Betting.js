import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";

import { GET_BETTING_PROVIDERS } from "../utils/constants";

import { setDisplayModal } from "../actions/modal";

import { setCurrentPage } from "../actions/page";
// import betway from "../assets/icons/Betway Logo.svg";
import bet9ja from "../assets/icons/Bet9ja Logo.svg";
// import sportybet from "../assets/icons/SportyBet Logo.svg";
import nairabet from "../assets/icons/Nairabet Logo.svg";
import cloudbet from "../assets/icons/cloudbet.jpg";
import betting from "../assets/images/football.svg";

import styles from "./Betting.module.scss";

export const Betting = ({ changeCurrentPage, displayModal }) => {
  const [loading, setLoading] = useState(true);
  const [bettingProviders, setBettingProviders] = useState([]);
  // const strings = window.location.href.split("/");
  // const service = strings[4];

  useEffect(() => {
    let isCancelled;

    (async function fetchBettingProviders() {
      try {
        const res = await axios.get(GET_BETTING_PROVIDERS);

        if (!isCancelled) {
          setBettingProviders(res.data.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.section}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>Betting Providers</h3>
          {!loading && bettingProviders ? (
            <div className={styles.services}>
              <Link to="/betting/cloudbet" className={styles.service}>
                <img className={styles.serviceLogo} src={cloudbet} alt="" />
                <p className={styles.serviceText}>Cloudbet</p>
              </Link>
              {bettingProviders.map((provider) => {
                const providerName = provider.provider.toLowerCase();

                if (providerName !== "cloudbet") {
                  return (
                    <Link
                      to={`/betting/${providerName}`}
                      className={styles.service}
                    >
                      <img
                        className={styles.serviceLogo}
                        src={
                          providerName === "bet9ja"
                            ? bet9ja
                            : providerName === "nairabet"
                            ? nairabet
                            : providerName === "cloudbet"
                            ? cloudbet
                            : betting
                        }
                        alt=""
                      />
                      <p className={styles.serviceText}>{providerName}</p>
                    </Link>
                  );
                }
              })}
            </div>
          ) : loading ? (
            <ThreeDots fill="#3E215B" />
          ) : (
            <div>Nothing to display</div>
          )}
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

export default connect(undefined, mapDispatchToProps)(Betting);

import React, { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { useToasts } from "react-toast-notifications";

import { setDisplayModal } from "../../../../actions/modal";

import {
  PLACE_BET,
  LIST_EVENTS,
  FETCH_BETSLIP,
} from "../../../../utils/constants";
import formatToCurrency from "../../../../utils/formatToCurrency";

import playReducer, { initialState } from "./play-reducer";

import print from "../../../../assets/icons/printer-print.svg";
import success from "../../../../assets/images/success-svgrepo-com.svg";
import symbol from "../../../../assets/images/x-symbol-svgrepo-com.svg";
import styles from "./Play.module.scss";

export const Play = ({ displayModal }) => {
  const [playState, dispatch] = useReducer(playReducer, initialState);
  const [events, setEvents] = useState([]);
  const [displayBettingReceipt, setDisplayBettingReceipt] = useState(false);
  const [receipt, setReceipt] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingCode, setBookingCode] = useState("");
  const [eventsLoading, setEventsLoading] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);
  const { addToast } = useToasts();

  useEffect(() => {
    let isCancelled = false;

    (async function fetchEvents() {
      setEventsLoading(true);
      try {
        const req = {
          provider: "54000",
        };
        const res = await axios.post(LIST_EVENTS, req);
        const events = res.data.data;

        if (!isCancelled) {
          setEvents(events);
        }
      } catch (e) {
        if (!isCancelled) {
          setEvents([]);
        }
      } finally {
        setEventsLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, []);

  //Calculate and dispatch total winnings from selected odds
  useEffect(() => {
    if (!isNaN(parseInt(playState.amount))) {
      let winnings;
      let oddsTotal;

      winnings = playState.bets
        .map((bet) => {
          return bet.selectedOutcomeOdds;
        })
        .reduce((accumulator, current) => {
          return accumulator * current;
        }, +playState.amount);

      winnings = Math.round(winnings).toFixed(2);
      oddsTotal = winnings / playState.amount;

      dispatch({
        type: "UPDATE_BET_DETAILS",
        payload: { oddsTotal },
      });

      dispatch({
        type: "UPDATE_BET_DETAILS",
        payload: { winnings },
      });
    }
  }, [playState.amount, playState.bets]);

  //Update bet detail e.g amount etc
  const handleUpdateState = ({ target }) => {
    dispatch({
      type: "UPDATE_BET_DETAILS",
      payload: { [target.name]: target.value },
    });
  };

  const handleAddToBetslip = (payload) => {
    dispatch({
      type: "ADD_TO_BETSLIP",
      payload,
    });
  };

  const handleRemoveBet = (id) => {
    dispatch({
      type: "REMOVE_FROM_BETSLIP",
      payload: { match_id: id },
    });
  };

  const handlePlaceBet = (e) => {
    e.preventDefault();
    const { provider, amount, phone, bets: betData } = playState;

    const bets = betData.map((bet) => {
      return {
        matchId: bet.match_id,
        stakeId: bet.stake_id,
      };
    });

    setLoading(true);

    (async function placeBet() {
      const payload = {
        provider,
        amount,
        phone: `234${phone.substr(1)}`,
        bets,
      };

      try {
        const res = await axios.post(PLACE_BET, payload);

        const receipt = res.data.data;

        if (typeof receipt[0] === "string") throw new Error();

        // dispatch({
        //   type: "REMOVE_FROM_BETSLIP"
        // })

        setReceipt(receipt);
        setDisplayBettingReceipt(true);
        setLoading(false);
      } catch (e) {
        addToast(e.response.data.message || "An error occurred", {
          appearance: "error",
          autoDismiss: true,
        });
        setLoading(false);
      }
    })();
  };

  const handleBookingCodeChange = ({ target }) => {
    setBookingCode(target.value);
  };

  const fetchBetslipFromCode = () => {
    setBookingLoading(true);

    (async function fetchSlip() {
      const req = {
        code: bookingCode,
        provider: "54000",
      };

      try {
        const res = await axios.post(FETCH_BETSLIP, req);

        const bets = res.data.data.STS;

        const formattedBetsPayload = bets.map((bet) => {
          return {
            stake_id: bet.SID,
            match_id: bet.MID,
            homeTeam: bet.AC,
            awayTeam: bet.HC,
            selectedOutcome:
              bet.M[5] === "1" ? bet.AC : bet.M[5] === "2" ? bet.HC : "Draw",
            selectedOutcomeOdds: bet.F,
          };
        });

        dispatch({
          type: "SET_BETSLIP",
          payload: formattedBetsPayload,
        });
      } catch (e) {
        // console.log(e.response);
        // setLoading(false);
      } finally {
        setBookingLoading(false);
      }
    })();
  };

  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <div>Betting</div>
        <div>{events.length > 0 && `+${events.length}`}</div>
      </div>
      <div className={styles.content}>
        <div className={styles.sectionBetting}>
          {events.length > 0 && !eventsLoading
            ? events.map((event) => {
                return (
                  <div key={event.Id} className={styles.betsContainer}>
                    <div className={styles.betDataSection}>
                      <div>{event.d}</div>
                      <div>{event.HT}</div>
                      <div>{event.AT}</div>
                    </div>
                    <div className={styles.oddsDataSection}>
                      <div className={styles.oddsData}>
                        <div className={styles.stakeTypes}>
                          +{event.StakeTypes.length}
                        </div>
                        <div
                          className={
                            playState.bets.findIndex(
                              (bet) =>
                                bet.stake_id ===
                                event.StakeTypes[0].Stakes[0].Id
                            ) !== -1
                              ? `${styles.odd} ${styles.active}`
                              : `${styles.odd}`
                          }
                          onClick={(e) => {
                            if (
                              playState.bets.findIndex(
                                (bet) =>
                                  bet.stake_id ===
                                  event.StakeTypes[0].Stakes[0].Id
                              ) > -1
                            ) {
                              handleRemoveBet(event.Id);
                            } else {
                              handleAddToBetslip({
                                stake_id: event.StakeTypes[0].Stakes[0].Id,
                                match_id: event.Id,
                                homeTeam: event.HT,
                                awayTeam: event.AT,
                                selectedOutcome: event.HT,
                                selectedOutcomeOdds:
                                  event.StakeTypes[0].Stakes[0].F,
                              });
                            }
                          }}
                        >
                          <span>Home</span>
                          <span>{event.StakeTypes[0].Stakes[0].F}</span>
                        </div>
                        <div
                          className={
                            playState.bets.findIndex(
                              (bet) =>
                                bet.stake_id ===
                                event.StakeTypes[0].Stakes[1].Id
                            ) !== -1
                              ? `${styles.odd} ${styles.active}`
                              : `${styles.odd}`
                          }
                          onClick={(e) => {
                            if (
                              playState.bets.findIndex(
                                (bet) =>
                                  bet.stake_id ===
                                  event.StakeTypes[0].Stakes[1].Id
                              ) > -1
                            ) {
                              handleRemoveBet(event.Id);
                            } else {
                              handleAddToBetslip({
                                stake_id: event.StakeTypes[0].Stakes[1].Id,
                                match_id: event.Id,
                                homeTeam: event.HT,
                                awayTeam: event.AT,
                                selectedOutcome: "Draw",
                                selectedOutcomeOdds:
                                  event.StakeTypes[0].Stakes[1].F,
                              });
                            }
                          }}
                        >
                          <span>Draw</span>
                          <span>{event.StakeTypes[0].Stakes[1].F}</span>
                        </div>
                        <div
                          className={
                            playState.bets.findIndex(
                              (bet) =>
                                bet.stake_id ===
                                event.StakeTypes[0].Stakes[2].Id
                            ) !== -1
                              ? `${styles.odd} ${styles.active}`
                              : `${styles.odd}`
                          }
                          onClick={(e) => {
                            if (
                              playState.bets.findIndex(
                                (bet) =>
                                  bet.stake_id ===
                                  event.StakeTypes[0].Stakes[2].Id
                              ) > -1
                            ) {
                              handleRemoveBet(event.Id);
                            } else {
                              handleAddToBetslip({
                                stake_id: event.StakeTypes[0].Stakes[2].Id,
                                match_id: event.Id,
                                homeTeam: event.HT,
                                awayTeam: event.AT,
                                selectedOutcome: event.AT,
                                selectedOutcomeOdds:
                                  event.StakeTypes[0].Stakes[2].F,
                              });
                            }
                          }}
                        >
                          <span>Away</span>
                          <span>{event.StakeTypes[0].Stakes[2].F}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            : eventsLoading
            ? "Loading..."
            : "No bets to display"}
        </div>
        <div className={styles.sectionBetslip}>
          <div className={styles.sectionBetslipHeading}>Betslip</div>
          <div className={styles.betslip}>
            <div className={styles.betslipContent}>
              {playState.bets.length > 0 && !displayBettingReceipt ? (
                <form onSubmit={handlePlaceBet}>
                  {playState.bets.map((bet) => {
                    return (
                      <div key={bet.match_id} className={styles.stakeDetails}>
                        <div className={styles.stakeDetailsEventData}>
                          <p
                            className={styles.matchDetails}
                          >{`${bet.homeTeam} vs ${bet.awayTeam}`}</p>
                          <p>Match Result</p>
                          <p>{bet.selectedOutcome}</p>
                        </div>
                        <div>
                          <p>{bet.selectedOutcomeOdds}</p>
                        </div>
                        <div
                          className={styles.removeBet}
                          onClick={() => handleRemoveBet(bet.match_id)}
                        >
                          <img src={symbol} alt="" />
                        </div>
                      </div>
                    );
                  })}

                  <div className={styles.accountDetails}>
                    <div>
                      <label>Stake:</label>
                      <input
                        name="amount"
                        onChange={handleUpdateState}
                        value={playState.amount}
                        type="text"
                        placeholder="0.00"
                      />
                    </div>
                    <div>
                      <label>Phone:</label>
                      <input
                        name="phone"
                        onChange={handleUpdateState}
                        value={playState.phone}
                        type="text"
                        placeholder="e.g 08012345678"
                      />
                    </div>
                  </div>
                  {playState.amount ? (
                    <div className={styles.amountDetails}>
                      <div>
                        <p>Odds: </p>
                        <p>{playState.oddsTotal}</p>
                      </div>
                      <div>
                        <p>Winnings: </p>
                        <p>{playState.winnings}</p>
                      </div>
                      <div>
                        <p>Bonus: </p>
                        <p>{0.0}</p>
                      </div>
                    </div>
                  ) : undefined}
                  {playState.bets.length > 0 &&
                  playState.amount &&
                  playState.phone ? (
                    <button>{loading ? "Loading..." : "Place Bet"}</button>
                  ) : undefined}
                </form>
              ) : displayBettingReceipt ? (
                <div className={styles.bettingReceipt}>
                  <img src={success} alt="success icon" />
                  <p className={styles.betType}>
                    <p>Type:</p>
                    <p>{receipt.bet_type}</p>
                  </p>
                  <div className={styles.selection}>
                    <p className={styles.selectionHeading}>Your selection</p>
                    {receipt.stakes.map((bet, index) => {
                      return (
                        <div
                          key={bet.selectedOutcomeOdds}
                          className={styles.selectionOdds}
                        >
                          <p>{bet.match}</p>
                          <p>@</p>
                          <p>{bet.total_odds}</p>
                        </div>
                      );
                    })}
                  </div>
                  <div>
                    <p>Bet code</p>
                    <p>{receipt.orderNumber}</p>
                  </div>
                  <div className={styles.orderDate}>
                    <p className={styles.orderDateHeading}>Date</p>
                    <p className={styles.orderDateContent}>
                      {receipt.orderDate}
                    </p>
                  </div>
                  <div className={styles.possibleWin}>
                    <p>Possible win</p>
                    <p>&#8358;{receipt.possibleWin}</p>
                  </div>
                  <div className={styles.betOptions}>
                    <button
                      onClick={(e) => {
                        handleRemoveBet();
                        setDisplayBettingReceipt(false);
                        setReceipt({});
                      }}
                      className={styles.newBet}
                    >
                      New Bet
                    </button>
                    <button
                      onClick={(e) => {
                        setDisplayBettingReceipt(false);
                        setReceipt({});
                      }}
                      className={styles.rebet}
                    >
                      Rebet
                    </button>
                  </div>
                  <div
                    className={styles.printSlip}
                    onClick={() => {
                      displayModal({
                        overlay: true,
                        modal: "printBetsip",
                        state: receipt,
                      });
                    }}
                  >
                    <img src={print} alt="" />
                    <span>Print Slip</span>
                  </div>
                </div>
              ) : (
                <div>
                  <p>Betslip is empty :'(</p>
                </div>
              )}
            </div>
          </div>
          <div className={styles.betcode}>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                fetchBetslipFromCode();
              }}
            >
              <div>
                <label>Please enter bet code</label>
                <input
                  type="text"
                  value={bookingCode}
                  onChange={(e) => handleBookingCodeChange(e)}
                />
              </div>
              <button type="submit">
                {bookingLoading ? "Loading..." : "Submit"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Play);

import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { setCurrentPage } from "../../actions/page";
import styles from "./Betting.module.scss";

export const Betting = ({ changeCurrentPage }) => {

  useEffect(() => {
    changeCurrentPage({
      heading: "Betting",
      search: true
    });    
  }, [changeCurrentPage]);
  
  return (
  <div className={styles.container}>&nbsp;</div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(Betting);
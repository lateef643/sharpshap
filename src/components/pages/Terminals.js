import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from './Terminals.module.scss';
import { setCurrentPage } from "../../actions/page";

export const ListTerminals = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: 'My Terminals',
    search: false
  });

  const terminals = [];
  terminals.length = 40;
  terminals.fill({
    name: "John Cross",
    terminalID: "8787-ahdjl-9836-hakd",
    date: "12th, March 2019",
  }, 0, 40);

  return (
    <div className={style.container}>
      <div className={style.heading}>
        <span className={style.one}>S/N</span>
        <span className={style.two}>Terminal ID</span>
        <span className={style.three}>Date</span>
        <span className={style.four}>Action</span>
      </div>
      {terminals.map((terminal, index) => ( 
        <div key={index} className={style.terminal}>
          <span className={style.one}>{index + 1}</span>
          <span className={style.two}>{terminal.terminalID}</span>
          <span className={style.three}>{terminal.date}</span>
          <span className={style.four}>
            <span className={style.action}>...</span>
            <span className={style.link}>
              <Link>Transaction History</Link>
            </span>
          </span>          
        </div> 
        )
      )}
  </div>
)};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(ListTerminals);
import React from "react";
import { Link } from "react-router-dom";
import style from './Terminals.module.scss';

const ListTerminals = (props) => {
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
        <span>S/N</span>
        <span>Terminal ID</span>
        <span>Date</span>
        <span>Action</span>
      </div>
      {terminals.map((terminal, index) => ( 
        <div key={index} className={style.terminal}>
          <span>{index + 1}</span>
          <span>{terminal.terminalID}</span>
          <span>{terminal.date}</span>
          <span>
            <span className={style.one}>...</span>
            <span className={style.two}>
              <Link>Transaction History</Link>
            </span>
          </span>          
        </div> 
        )
      )}
  </div>
)};

export default ListTerminals;
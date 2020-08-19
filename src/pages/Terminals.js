import React, { useState, useEffect } from "react";
import axios from "axios";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import ListLoader from "../components/util/ListLoader";
import style from "./Terminals.module.scss";
import { setCurrentPage } from "../actions/page";
import { LIST_TERMINALS } from "../store/api/constants";

export const ListTerminals = ({ changeCurrentPage }) => {
  const [terminals, setTerminals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(LIST_TERMINALS)
      .then((res) => {
        const terminals = res.data.data.data;
        setLoading(false);
        setTerminals(terminals);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    changeCurrentPage({
      heading: "My Terminals",
      search: false,
    });
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loaderContainer}>
          <ListLoader />
        </div>
      ) : undefined}
      {!loading && terminals.length > 0 ? (
        <div className={style.heading}>
          <span className={style.one}>S/N</span>
          <span className={style.two}>Terminal ID</span>
          <span className={style.three}>Date</span>
          <span className={style.four}>Action</span>
        </div>
      ) : undefined}
      {!loading
        ? terminals.map((terminal, index) => (
            <div key={terminal.id} className={style.terminal}>
              <span className={style.one}>{index + 1}</span>
              <span className={style.two}>{terminal.terminal_id}</span>
              <span className={style.three}>{terminal.created_at}</span>
              <span className={style.four}>
                <span className={style.action}>...</span>
                <span className={style.link}>
                  <Link to="/transaction-log">Transaction History</Link>
                </span>
              </span>
            </div>
          ))
        : undefined}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(ListTerminals);

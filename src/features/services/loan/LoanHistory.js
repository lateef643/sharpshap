import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import { connect } from "react-redux";

import { LOAN_HISTORY } from "../../../utils/constants";

import styles from "./LoanHistory.module.scss";

export const RechargeCableForm = ({ agentId }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let isCancelled;

    (async function getLoanHistory() {
      setLoading(true);
      try {
        const res = await axios.post(LOAN_HISTORY, agentId);
        const history = res.data.data;

        if (res && !isCancelled) setHistory(history);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return <div>this is the history part lets go</div>;
};

RechargeCableForm.propTypes = {
  RechargeCableFormState: PropTypes.object.isRequired,
  setFormState: PropTypes.func.isRequired,
  setComponentToRender: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    agentId: state.auth.user.id,
  };
};

export default connect(mapStateToProps)(RechargeCableForm);

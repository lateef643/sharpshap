import React, { useEffect, useState } from "react";
// import axios from "axios";
import ListLoader from "../../components/util/ListLoader";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import style from "./ListUsers.module.scss";
import { setCurrentPage } from "../../actions/page";

export const ListUsers = ({ changeCurrentPage }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   axios.get()
  //   .then((res) => {
  //     const logs = res.data.data.data;
  //     setLogs(logs);
  //     setLoading(false);
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   })
  // }, [])

  useEffect(() => {
    changeCurrentPage({
      heading: "List Users",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {loading ? (
        <div className={style.loaderContainer}>
          <ListLoader />
        </div>
      ) : undefined}
      {!loading && users.length > 0 ? (
        <div className={style.heading}>
          <span>S/N</span>
          <span>Name</span>
          <span>Phone &nbsp;</span>
          <span>Role</span>
          <span>Last Login</span>
          <span>Action</span>
        </div>
      ) : undefined}
      {!loading
        ? users.map((user, index) => (
            <div key={index} className={style.content}>
              <span>{index + 1}</span>
              <span>{user.name}</span>
              <span>{user.phone}</span>
              <span>{user.role}</span>
              <span>{user.login}</span>
              <span>
                <span className={style.one}>...</span>
                <span className={style.two}>
                  <Link>Edit</Link>
                  <Link>Delete</Link>
                  <Link>View History</Link>
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

export default connect(undefined, mapDispatchToProps)(ListUsers);

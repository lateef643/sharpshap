import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styles from "./index.module.scss";
import axios from "axios";

import { setCurrentPage } from "../../actions/page";
import { setDisplayModal } from "../../actions/modal";
import { useToasts } from "react-toast-notifications";

import userGroup from "../../assets/icons/users.svg";

import ListUsers from "./ListUsers";
import { LIST_USERS, DELETE_USER } from "../../utils/constants";

export const Users = ({ changeCurrentPage, displayModal, modalIsUpdated }) => {
  const [isUpdated, setIsUpdated] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const { addToast } = useToasts();

  useEffect(() => {
    let isCancelled;

    (async function listUsers() {
      setLoading(true);

      try {
        const res = await axios.get(LIST_USERS);
        const users = res.data.data;

        if (!isCancelled) {
          setUsers(users);
        }
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    })();

    return () => {
      isCancelled = true;
    };
  }, [modalIsUpdated]);

  const handleDeleteUser = (id) => {
    const getConfirmation = window.confirm("Do you want to deactivate user?");

    if (getConfirmation) {
      (async function deleteUser() {
        try {
          const res = await axios.delete(`${DELETE_USER}/${id}`);

          if (res) {
            addToast("User deleted successfully", {
              appearance: "success",
              autoDismiss: true,
            });
          }
        } catch (e) {
          addToast("User not deleted", {
            appearance: "error",
            autoDismiss: true,
          });
        } finally {
          setIsUpdated(id);
        }
      })();
    }
  };

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
    <div className={styles.container}>
      <div className={styles.menu}>
        <div className={styles.card}>
          <h3 className={styles.sectionHeading}>User management</h3>
          <div className={styles.services}>
            <div
              className={styles.service}
              onClick={() => {
                displayModal({
                  overlay: true,
                  modal: "addUsers",
                  service: "",
                });
              }}
            >
              <img className={styles.serviceLogo} src={userGroup} alt="" />
              <p className={styles.serviceText}>Add User</p>
            </div>
          </div>
        </div>
      </div>
      <ListUsers
        users={users}
        handleDeleteUser={handleDeleteUser}
        isUpdated={isUpdated}
        loading={loading}
      />
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    modalIsUpdated: state.modal.isUpdated,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
    displayModal: (payload) => dispatch(setDisplayModal(payload)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Users);

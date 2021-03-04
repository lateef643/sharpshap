import React from "react";

import styles from "./Modal.module.scss";

const Modal = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export default Modal;

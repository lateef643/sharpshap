import React from "react";

import styles from "./FormGroup.module.scss";

const FormGroup = ({ children, display }) => {
  return (
    <div
      className={`${styles.group} ${
        display === "flex" ? styles.flex : styles.default
      }`}
    >
      {children}
    </div>
  );
};

export default FormGroup;

import React from "react";

import styles from "./Button.module.scss";

const Button = ({ children, disabled, onClick }) => {
  return (
    <button className={styles.button} disabled={disabled} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;

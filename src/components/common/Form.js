import React from "react";

// import logo from "../../assets/images/cico-logo.svg";

import styles from "./Form.module.scss";

const Form = ({
  handleOnSubmit,
  children,
  title,
  caption,
  titleSize,
  disabled,
  logo,
}) => {
  return (
    <div className={styles.formContainer}>
      <img className={styles.logo} src={logo} alt="company logo" />
      <p
        className={`${styles.title}  ${
          titleSize === "large" ? styles.large : styles.default
        }`}
      >
        {title}
      </p>
      <p className={styles.caption}>{caption}</p>
      <form className={styles.form} onSubmit={handleOnSubmit}>
        {children}
      </form>
      ;
    </div>
  );
};

export default Form;

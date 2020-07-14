import React from "react";

import styles from "./Register.module.scss";

export const Register = () => {
  return (
    <div className={styles.container}>
      <form className={styles.form} autoComplete="off">
        <p className={styles.formHeading}>Register</p>
        <div className={styles.formGroup}>
          <label htmlFor="new">Name</label>
          <input name="new" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm">Business Name</label>
          <input name="confirm" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm">Address</label>
          <input name="confirm" type="text" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="confirm">Email</label>
          <input name="confirm" type="text" />
        </div>
        <button className={styles.resetButton} type="submit">
          <span>Reset</span>
        </button>
      </form>
    </div>
  );
};

export default Register;

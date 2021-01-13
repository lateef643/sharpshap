import React from "react";

import styles from "./form.module.scss";

const FileUploads = () => {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload Utility Bill...
          </label>
          <input type="file" name="firstname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload Guarantor's Form...
          </label>
          <input type="file" name="firstname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload ID Card...
          </label>
          <input type="file" name="firstname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload Passport...
          </label>
          <input type="file" name="firstname" />
        </div>

        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default FileUploads;

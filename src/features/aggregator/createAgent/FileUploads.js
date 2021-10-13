import React from "react";

import styles from "./FileUploads.module.scss";

// function validateFileType(){
//   var fileName = document.getElementById("fileName").value;
//   var idxDot = fileName.lastIndexOf(".") + 1;
//   var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();
//   if (extFile=="jpg" || extFile=="jpeg" || extFile=="png"){
//       //TO DO
//   }else{
//       alert("Only jpg/jpeg and png files are allowed!");
//   }   
// }

const FileUploads = () => {
  return (
    <div>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload Utility Bill...
          </label>
          <input accept="image/*"  type="file" name="firstname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload Guarantor's Form...
          </label>
          <input  accept="image/*"  type="file" name="firstname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload ID Card...
          </label>
          <input  accept="image/*" type="file" name="firstname" />
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="firstname">
            <span>Browse</span>Upload Passport...
          </label>
          <input  accept="image/*" type="file" name="firstname" />
        </div>

        <div className={`${styles.submit} ${styles.formGroup}`}>
          <button  type="submit">Next</button>
        </div>
      </form>
    </div>
  );
};

export default FileUploads;

import React, { useState } from "react";
import user from "../../../../assets/images/user.svg";
import style from './UploadPhoto.module.scss';

const UploadPhoto = (props) => {
  const [file, setFile] = useState("");

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={(e) => {
      e.preventDefault();

      if (file) {
        props.handleSetPage("form");
      };
    }} >
    <img src={user} alt="User avatar" />
      <label>
        <input type="file" onChange={(e) => {
          const file = e.target.value;
          setFile(file);
          props.handleSetFile(file);
        }}/>
      </label>       
      <button type="submit">Proceed</button>
    </form>    
  </div>
)}

export default UploadPhoto;
import React, { useState } from "react";
import user from "../../../../assets/images/user.svg";
import './UploadPhoto.scss';

const UploadPhoto = (props) => {
  const [file, setFile] = useState("");

  return (
  <div className="upload-photo">
    <form className="form upload-photo__form" onSubmit={(e) => {
      e.preventDefault();

      if (file) {
        props.handleSetPage("form");
      };
    }} >
    <img src={user} />
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
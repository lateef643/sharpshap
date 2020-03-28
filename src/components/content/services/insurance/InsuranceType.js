import React, { useState } from "react";
import style from './InsuranceType.module.scss';

const InsuranceType = (props) => {
  const [type, setType] = useState("");

  return (
  <div className={style.container}>
    <form className={style.form} onSubmit={(e) => {
      e.preventDefault();
      props.handleSetType(type);

      if (type === "renewal") {
        props.handleSetPage("form");
      };

      if (type === "new") {
        props.handleSetPage("upload");
      };
    }} >
      <label>
        <select onChange={(e) => {
          e.preventDefault();
          const type = e.target.value;
          setType(type);
          props.handleSetType(type);
        }}>     
          <option value="">Select Type</option>
          <option value="new">New Subscriber</option>
          <option value="renewal">Renewal</option>
        </select> 
      </label>       
      <button type="submit">Submit</button>
    </form>    
  </div>
)}

export default InsuranceType;
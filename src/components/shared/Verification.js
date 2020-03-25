import React, { useState } from "react";
import './Verification.scss';

const Verification = (props) => (
  <div className="verification">
    <div className="verification-container" >
      <div>
        <span>{props.title}</span>
        <span>{props.value}</span>
      </div>
      <div>
        <span>{props.title}</span>
        <span>{props.value}</span>   
      </div>
      <div>    
        <span>{props.title}</span>
        <span>{props.value}</span> 
      </div> 
      <button>Continue</button>       
    </div>    
  </div>
);

export default Verification;
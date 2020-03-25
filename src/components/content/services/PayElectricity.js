import React from "react";
import { Link } from "react-router-dom";
import "./PayElectricity.scss";
import ikeja from "../../../assets/images/Googleikedc.png";
import ibadan from "../../../assets/images/download (8).png";
import abuja from "../../../assets/images/Abuja electricity.png";
import enugu from "../../../assets/images/Enugu.png";
import kaduna from "../../../assets/images/Kaduna.png";
import kano from "../../../assets/images/Kano.png";
import ph from "../../../assets/images/Ph.png";
import jos from "../../../assets/images/jos.png";
import PayElectricityForm from "./PayElectricityForm";

const PayElectricity = (props) => {  
  return (
  <div className="pay-electricity">
    <div className="pay-electricity-container">
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={ikeja} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={ibadan} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={abuja} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={enugu} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={kaduna} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={kano} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={ph} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>  
      <Link to="#" className="pay-electricity__card">
        <div className="pay-electricity__card-container">
          <img src={jos} className="pay-electricity__card__image" alt="card icon" />
        </div>
      </Link>
    </div>
  </div>
)};

export default PayElectricity;
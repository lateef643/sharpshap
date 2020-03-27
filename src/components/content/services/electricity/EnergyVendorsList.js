import React from "react";
import style from "./EnergyVendorsList.module.scss";
import ikeja from "../../../../assets/images/Googleikedc.png";
import ibadan from "../../../../assets/images/download (8).png";
import abuja from "../../../../assets/images/Abuja electricity.png";
import enugu from "../../../../assets/images/Enugu.png";
import kaduna from "../../../../assets/images/Kaduna.png";
import kano from "../../../../assets/images/Kano.png";
import ph from "../../../../assets/images/Ph.png";
import jos from "../../../../assets/images/jos.png";

const EnergyVendorsList = (props) => { 
  console.log(props) 
  return (
  <div className={style.energyVendors}>
    <div className={style.energyVendorsContainer}>
      <div onClick={(e) => {
        e.preventDefault();
        console.log(props)
        props.handleSetPage('form');
        props.handleSetVendor(ikeja);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={ikeja} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(ibadan);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={ibadan} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(abuja);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={abuja} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(enugu);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={enugu} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(kaduna);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={kaduna} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(kano);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={kano} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(ph);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={ph} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(jos);
      }} className={style.energyVendorsCardSection}>
        <div className={style.container}>
          <img src={jos} className={style.image} alt="card icon" />
        </div>
      </div>
    </div>
  </div>
)};

export default EnergyVendorsList;
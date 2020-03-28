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
  <div className={style.sectionContainer}>
    <div className={style.cardContainer}>
      <div onClick={(e) => {
        e.preventDefault();
        console.log(props)
        props.handleSetPage('form');
        props.handleSetVendor(ikeja);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={ikeja} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(ibadan);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={ibadan} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(abuja);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={abuja} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(enugu);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={enugu} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(kaduna);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={kaduna} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(kano);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={kano} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(ph);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={ph} className={style.image} alt="card icon" />
        </div>
      </div>  
      <div onClick={(e) => {
        e.preventDefault();
        props.handleSetPage('form');
        props.handleSetVendor(jos);
      }} className={style.card}>
        <div className={style.imageBox}>
          <img src={jos} className={style.image} alt="card icon" />
        </div>
      </div>
    </div>
  </div>
)};

export default EnergyVendorsList;
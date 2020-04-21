import React from "react";
import style from "./EnergyVendorsList.module.scss";
import ikeja from "../../../../assets/images/ikedc.png";
import ibadan from "../../../../assets/images/ibedc.png";
import abuja from "../../../../assets/images/Abuja electricity.png";
import benin from "../../../../assets/images/Enugu.png";
import kaduna from "../../../../assets/images/Kaduna.png";
import kano from "../../../../assets/images/Kano.png";
import ph from "../../../../assets/images/Ph.png";

const EnergyVendorsList = (props) => { 
  const energyVendors = [{"id":1,"name":"EKEDC","buypower_code":"EKO","active":"1"},
  {"id":2,"name":"IBEDC","buypower_code":"IBADAN","active":"1"},{"id":3,"name":"AEDC","buypower_code":"ABUJA","active":"1"},
  {"id":4,"name":"KEDC","buypower_code":"KANO","active":"1"},{"id":5,"name":"KAEDC","buypower_code":"KADUNA","active":"1"},
  {"id":6,"name":"IKEDC","buypower_code":"IKEJA","active":"1"},{"id":7,"name":"PHEDC","buypower_code":"PH","active":"1"},
  {"id":8,"name":"BEDC","buypower_code":"Benin","active":"1"}]

  return (
  <div className={style.sectionContainer}>
    <div className={style.cardContainer}>
      {energyVendors.map(vendor => {
        let imgSrc;

        switch(vendor.name) {
          case "IKEDC":
            imgSrc = ikeja;
            break;
          case "EKEDC":
            imgSrc = ikeja;
            break;          
          case "IBEDC":
            imgSrc = ibadan;
            break;          
          case "AEDC":
            imgSrc = abuja;
            break;          
          case "KEDC":
            imgSrc = kano;
            break;          
          case "KAEDC":
            imgSrc = kaduna;
            break;          
          case "PHEDC":
            imgSrc = ph;
            break;          
          case "BEDC":
            imgSrc = benin;
            break;
        }
        return <div onClick={(e) => {
          e.preventDefault();
          props.handleSetPage('form');
          props.handleSetVendor(vendor.buypower_code, imgSrc);
        }} 
        className={style.card}>
          <div className={style.imageBox}>
            <img src={imgSrc} className={style.image} alt="card icon" />
          </div>
        </div>  
      })}
    </div>
  </div>
)};

export default EnergyVendorsList;
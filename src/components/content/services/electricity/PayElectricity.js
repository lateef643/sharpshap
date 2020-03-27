import React, { useState } from "react";
import style from './PayElectricity.module.scss';
import EnergyVendorsList from "./EnergyVendorsList";
import PayElectricityForm from "./PayElectricityForm";

const PayElectricity = (props) => {
  const [vendor, setVendor] = useState("");
  const [page, setPage] = useState("");

  const handleSetVendor = (vendor) => {
    setVendor(vendor);
  };

  const handleSetPage = (page) => {
    setPage(page);
  };

  return (
  <div className={style.PayElectricity}>
     {page === "form" ? <PayElectricityForm 
      vendorImage={vendor}
    />
  : <EnergyVendorsList
    handleSetVendor={handleSetVendor}
    handleSetPage={handleSetPage}
  />}
  </div>
)}

export default PayElectricity;
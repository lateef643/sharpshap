import React, { useState } from "react";
import { connect } from "react-redux";
import style from './PayElectricity.module.scss';
import EnergyVendorsList from "./EnergyVendorsList";
import PayElectricityForm from "./PayElectricityForm";
import { setCurrentPage } from "../../../../actions/page";

export const PayElectricity = ({ changeCurrentPage }) => {
  changeCurrentPage({
    heading: "Pay Electricity Bill",
    search: false
  });

  const [vendor, setVendor] = useState("");
  const [page, setPage] = useState("");

  const handleSetVendor = (vendor) => {
    setVendor(vendor);
  };

  const handleSetPage = (page) => {
    setPage(page);
  };

  return (
  <div className={style.container}>
     {page === "form" ? <PayElectricityForm 
      vendorImage={vendor}
    />
  : <EnergyVendorsList
    handleSetVendor={handleSetVendor}
    handleSetPage={handleSetPage}
  />}
  </div>
)}

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: payload => dispatch(setCurrentPage(payload))
  }
};

export default connect(undefined, mapDispatchToProps)(PayElectricity);
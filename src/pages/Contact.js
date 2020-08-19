import React, { useEffect } from "react";
import { connect } from "react-redux";

import { setCurrentPage } from "../actions/page";

import address from "../assets/images/address.svg";
import phone from "../assets/images/phone-3.svg";
import email from "../assets/images/email.svg";
import whatsapp from "../assets/images/whatsapp.svg";
import styles from "./Contact.module.scss";

export const Contact = ({ changeCurrentPage }) => {
  useEffect(() => {
    changeCurrentPage({
      heading: "Contact Us",
      search: true,
    });
  });

  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.heading}>
          <h3>Get in touch</h3>
          <p>
            Want to get in touch? We'd love to hear from you. Here's how you can
            reach us...
          </p>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <img src={phone} alt="phone icon" />
            <p>+2349080070040</p>
          </div>
          <div className={styles.section}>
            <img src={email} alt="email icon" />
            <p>hello@cico.ng</p>
          </div>
          <div className={styles.section}>
            <img src={whatsapp} alt="whatsapp icon" />
            <p>+2349080070040</p>
          </div>
          <div className={styles.section}>
            <img src={address} alt="address icon" />
            <p>41/42 Industrial Estate, Sabo, Yaba, Lagos.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(Contact);

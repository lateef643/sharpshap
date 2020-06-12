import React from "react";
import address from "../../assets/images/address.svg";
import phone from "../../assets/images/phone-3.svg";
import email from "../../assets/images/email.svg";
import whatsapp from "../../assets/images/whatsapp.svg";
import styles from "./Contact.module.scss";

export const Contact = () => {
  return (
    <div className={styles.container}>
      <div className={styles.sectionContainer}>
        <div className={styles.heading}>
          <h3>Get in touch</h3>
          <p>Want to get in touch? We'd love to hear from you. 
            Here's how you can reach us...</p>
        </div>
        <div className={styles.content}>
          <div className={styles.section}>
            <img src={phone} />
            <p>+2349080070040</p>
          </div>
          <div className={styles.section}>
            <img src={email} />
            <p>hello@cico.ng</p>
          </div>
          <div className={styles.section}>
            <img src={whatsapp} />
            <p>+2349080070040</p>
          </div>
          <div className={styles.section}>
            <img src={address} />
            <p>41/42 Industrial Estate, Sabo, Yaba, Lagos.</p>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Contact;
import { Link } from "react-router-dom";

import styles from "./NavigationCard.module.scss";

const NavigationCard = ({ icon, type, text, description }) => {
  return (
    <Link to="/new-payment" className={`${styles.card} ${styles[type]}`}>
      <div
        className={`${styles.iconContainer} ${
          type === "transfer"
            ? styles.iconContainerTransfer
            : styles.iconContainerDefault
        }`}
      >
        <img className={styles.icon} src={icon} alt="" />
      </div>
      <div className={`${styles.cardText} ${styles[type]}`}>{text}</div>
      <div
        className={`${styles.cardDescription} ${
          type === "transfer"
            ? styles.cardDescriptionTransfer
            : styles.cardDescriptionTransferDefault
        }`}
      >
        {description}
      </div>
    </Link>
  );
};

export default NavigationCard;

import React from "react";
import { Link } from "react-router-dom";
import styles from "./Card.module.scss";

const Card = (props) => (
  <Link
    to={`/${props.link}`}
    className={`${styles.card} ${styles[props.size]}`}
  >
    <div className={styles.container}>
      <img src={props.image} className={styles.image} alt="card icon" />
      <p className={styles.text}>{props.text}</p>
    </div>
  </Link>
);

export default Card;

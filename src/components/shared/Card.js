import React from "react";
import { Link } from "react-router-dom";
import style from './Card.module.scss';

const Card = (props) => (
  <Link to={`/${props.link}`} className={style.card}>
    <div className={style.container}>
      <img src={props.image} className={style.image} alt="card icon" />
      <p className={style.text}>{props.text}</p>      
    </div>
  </Link>
);

export default Card;
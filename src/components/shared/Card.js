import React from "react";
import { Link } from "react-router-dom";
import './Card.scss';

const Card = (props) => (
  <Link to={`/${props.link}`} className="card">
    <div className="card-container">
      <img src={props.image} className="card__image" alt="card icon" />
      <p className="card__text">{props.text}</p>      
    </div>
  </Link>
);

export default Card;
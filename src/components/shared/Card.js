import React from "react";
import './Card.scss';

const Card = (props) => (
  <div className="card">
    <div className="card-container">
      <img src={props.image} className="card__image" alt="card icon" />
      <p className="card__text">{props.text}</p>      
    </div>
  </div>
);

export default Card;
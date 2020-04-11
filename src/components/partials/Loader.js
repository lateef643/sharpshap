import React from "react";
import style from "./Loader.module.scss";

const Loader = ({color, size, position}) => {
  return (
    <div className={`${style.swing} ${style[size]} ${style[position]}`}>
      <div className={`${style.swingDot} ${style[color]}`}></div>
      <div className={`${style.swingDot} ${style[color]}`}></div>
    </div>
  )
};

export default Loader;
import React from "react";
import style from "./Loader.module.scss";

const Loader = ({color, size}) => {
  return (
    <div className={`${style.circle} ${style[color]} ${style[size]}`}>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
    <div className={style.circleDot}></div>
  </div>
  )
};

export default Loader;
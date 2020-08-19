import React from "react";
import style from "./VerificationLoader.module.scss";

export const VerificationLoader = () => (
  <div className={style.flow}>
    <div className={style.flowDot}></div>
    <div className={style.flowDot}></div>
    <div className={style.flowDot}></div>
  </div>
);

export default VerificationLoader;

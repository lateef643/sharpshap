import React from "react";

import errorIcon from "../../assets/icons/circle-cross.svg";
import successIcon from "../../assets/icons/circle-check.svg";

import styles from "./Select.module.scss";

const Select = ({
  children,
  type,
  label,
  handleOnChange,
  placeholder,
  name,
  value,
  pattern,
  onInvalid,
  required,
  min,
  max,
  maxLength,
  minLength,
}) => {
  return (
    <>
      <label className={styles.label} htmlFor={name} label={label}>
        {label}
      </label>
      <select
        className={styles.select}
        name={name}
        value={value}
        onChange={handleOnChange}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        onInvalid={onInvalid}
        required={required}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
      >
        {children}
      </select>
    </>
  );
};

export default Select;

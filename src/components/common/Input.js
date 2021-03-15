import React from "react";
import { ThreeDots } from "svg-loaders-react";

import styles from "./Input.module.scss";

const Input = ({
  type,
  label,
  handleOnChange,
  placeholder,
  readOnly,
  name,
  value,
  pattern,
  onInvalid,
  required,
  min,
  max,
  maxLength,
  disabled,
  minLength,
  error,
  autoComplete,
  success,
  display,
  loading,
}) => {
  return (
    <>
      {label && (
        <label
          className={`${styles.label} 
          ${display === "flex" ? styles.block : styles.default}`}
          error={error}
          htmlFor={name}
          label={label}
        >
          {label}
        </label>
      )}
      <input
        disabled={disabled}
        name={name}
        value={value}
        onChange={handleOnChange}
        type={type}
        placeholder={placeholder}
        pattern={pattern}
        readonly={readOnly}
        onInvalid={onInvalid}
        required={required}
        min={min}
        max={max}
        maxLength={maxLength}
        minLength={minLength}
        label={label}
        autoComplete={autoComplete}
        className={styles.input}
      />
      {loading && <ThreeDots fill="green" />}
      {error && (
        <p className={styles.error}>
          {/* <img className={styles.errorIcon} src={errorIcon} alt="" /> */}
          <span className={styles.errorText}>{error.text}</span>
        </p>
      )}
    </>
  );
};

export default Input;

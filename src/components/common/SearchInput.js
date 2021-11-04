import React from "react";

import searchImage from "../../assets/images/search.svg";

import styles from "./SearchInput.module.scss";

const SearchInput = ({ value, handleOnChange }) => {
  return (
    <div className={styles.searchContainer}>
      <img className={styles.searchImage} src={searchImage} alt="" />
      <input
        className={styles.searchInput}
        name="search"
        type="text"
        value={value}
        onChange={handleOnChange}
      />
    </div>
  );
};

export default SearchInput;

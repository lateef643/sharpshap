import React, { useState } from "react";
import { connect } from "react-redux";
import user from "../../../../assets/images/user.svg";
import style from "./UploadPhoto.module.scss";
import { setCurrentPage } from "../../../../actions/page";

export const UploadPhoto = ({
  changeCurrentPage,
  handleSetPage,
  handleSetFile,
}) => {
  changeCurrentPage({
    heading: "Buy Insurance",
    search: false,
    sub: "Upload Photo",
  });

  const [file, setFile] = useState("");

  return (
    <div className={style.container}>
      <form
        className={style.form}
        onSubmit={(e) => {
          e.preventDefault();

          if (file) {
            handleSetPage("form");
          }
        }}
      >
        <img src={user} alt="User avatar" />
        <label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.value;
              setFile(file);
              handleSetFile(file);
            }}
          />
        </label>
        <button type="submit">Proceed</button>
      </form>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(UploadPhoto);

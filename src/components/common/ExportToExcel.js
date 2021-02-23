import React from "react";
import ReactExport from "react-export-excel";
import excel from "../../assets/icons/excel.svg";
import styles from "./ExportToExcel.module.scss";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const Download = (props) => {
  const { filename, dataset, labels } = props;

  const transactionDataForExcel = dataset.map((data) => {
    return {
      status: data.status,
      date: data.created_at,
      "previous balance": data.wallet_history.previous_bal,
      "current balance": data.wallet_history.current_bal,
      amount: data.amount,
      customer: data.customer_info,
      reference: data.reference,
      type: data.transtype?.name,
    };
  });

  return (
    <ExcelFile
      element={
        <button className={styles.button}>
          <img src={excel} alt="" />
          Export
        </button>
      }
    >
      <ExcelSheet data={transactionDataForExcel} name={filename}>
        {labels.map((label, index) => {
          return (
            <ExcelColumn key={index} label={label.name} value={label.value} />
          );
        })}
      </ExcelSheet>
    </ExcelFile>
  );
};

export default Download;

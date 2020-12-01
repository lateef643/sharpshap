import React, { useEffect, useState } from "react";
import axios from "axios";
import { ThreeDots } from "svg-loaders-react";
import minus from "../../../assets/images/minus.svg";
import plus from "../../../assets/images/plus.svg";
import { connect } from "react-redux";
import { setCurrentPage } from "../../../actions/page";
import formatToCurrency from "../../../utils/formatToCurrency";
import { GET_AGENT_WALLET_HISTORY } from "../../../utils/constants";
import style from "./WalletLog.module.scss";

export const WalletLog = ({ changeCurrentPage }) => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [total, setTotal] = useState(null);
  // const [perPage, setPerPage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageNumbers, setPageNumbers] = useState([]);
  const [lastPage, setLastPage] = useState("");
  const [pageChangeLoading, setPageChangeLoading] = useState(false);
  const [deviceWidth, setDeviceWidth] = useState(window.innerWidth);
  const [accordionToggle, setAccordionToggle] = useState(false);
  const [activeListItem, setActiveListItem] = useState(null);
  const firstPage = 1;

  useEffect(() => {
    const handleResize = () => {
      setDeviceWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  useEffect(() => {
    let isCancelled = false;

    axios
      .get(`${GET_AGENT_WALLET_HISTORY}?page=${currentPage}`)
      .then((res) => {
        const logs = res.data.data.data;
        const total = res.data.data.total;
        const perPage = res.data.data.per_page;

        // const prevPage = res.data.data.prev_page_url;
        // const nextPageUrl = res.data.data.next_page_url;
        const lastPage = res.data.data.last_page;
        // const currentPage = res.data.data.current_page;
        let pageNumbers = [];

        if (total !== null && total > 0) {
          for (let i = 1; i <= Math.ceil(total / perPage); i++) {
            pageNumbers.push(i);
          }
          setPageNumbers(pageNumbers);
        }

        if (!isCancelled) {
          setLastPage(lastPage);
          // setTotal(total);
          // setPerPage(perPage);
          setLogs(logs);
          setLoading(false);
          setPageChangeLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          setLogs([]);
          setLoading(false);
          setPageChangeLoading(false);
        }
      });

    return () => {
      isCancelled = false;
    };
  }, [currentPage]);

  useEffect(() => {
    changeCurrentPage({
      heading: "Wallet Log",
      search: true,
    });
  }, [changeCurrentPage]);

  return (
    <div className={style.container}>
      {!loading && !pageChangeLoading && logs.length === 0 && (
        <div>Nothing to display</div>
      )}
      {(loading || pageChangeLoading) && (
        <div className={style.loaderContainer}>
          <ThreeDots />
        </div>
      )}
      {!loading && logs.length > 0 && deviceWidth > 600 && (
        <div className={style.heading}>
          <span className={style.itemOne}>Previous Balance</span>
          <span className={style.itemTwo}>Amount</span>
          <span className={style.itemThree}>Current Balance</span>
          <span className={style.itemFour}>Description</span>
          <span className={style.itemFive}>Type</span>
          <span className={style.itemSix}>Mode</span>
          <span className={style.itemSeven}>Date Created</span>
        </div>
      )}
      {(!loading || !pageChangeLoading) &&
        logs.map((log, index) => (
          <div key={`${log.id}--${index}`} className={style.log}>
            {deviceWidth <= 600 && (
              <div className={style.mobileHeading}>
                <span
                  className={`${style.mobileHeadingItem} ${style.mobileHeadingItemIndex}`}
                >
                  {index + 1}.
                </span>
                <span
                  className={`${style.mobileHeadingItem} ${style.mobileHeadingItemDate}`}
                >
                  {deviceWidth <= 600 && log.created_at.slice(0, 10)}
                </span>
                <span
                  className={`${style.mobileHeadingItem} ${style.mobileHeadingItemAmount}`}
                >
                  {formatToCurrency(log.amount)}
                </span>
                {/* <span
                  className={`${style.mobileHeadingItem} ${style.mobileHeadingItemDate}`}
                >
                  {log.current_bal}
                </span> */}
                <span
                  className={`${style.mobileHeadingItem} ${style.mobileHeadingItemType}`}
                >
                  {log.type}
                </span>
                <img
                  className={style.accordionToggle}
                  src={
                    accordionToggle && activeListItem === index ? minus : plus
                  }
                  alt="toggle direction icon"
                  onClick={() => {
                    setAccordionToggle(!accordionToggle);
                    setActiveListItem(index);
                  }}
                />
              </div>
            )}
            <span
              className={
                deviceWidth < 600 && accordionToggle && activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemOne}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>
                  Previous Balance:
                </span>
              )}
              <span>{formatToCurrency(log.previous_bal)}</span>
            </span>
            <span
              className={
                deviceWidth < 600 && accordionToggle && activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemTwo}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>Amount:</span>
              )}
              <span>{formatToCurrency(log.amount)}</span>
            </span>
            <span
              className={
                deviceWidth < 600 && accordionToggle && activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemThree}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>
                  Current balance:
                </span>
              )}
              <span>{formatToCurrency(log.current_bal)}</span>
            </span>
            <span
              className={
                deviceWidth < 600 && accordionToggle && activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemFour}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>
                  Description:
                </span>
              )}
              <span>{log.description || "Nil"}</span>
            </span>
            <span
              className={
                deviceWidth < 600 && accordionToggle && activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemFive}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>Type:</span>
              )}
              <span>{log.type}</span>
            </span>
            <span
              className={
                deviceWidth < 600 && accordionToggle && activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemSix}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>Mode:</span>
              )}
              <span>{log.mode}</span>
            </span>
            <span
              className={
                deviceWidth <= 600 &&
                accordionToggle &&
                activeListItem === index
                  ? `${style.mobileListItem}`
                  : deviceWidth < 600 &&
                    (!accordionToggle || activeListItem !== index)
                  ? `${style.mobileListItem} ${style.hideMobileListItem}`
                  : `${style.itemSeven}`
              }
            >
              {deviceWidth <= 600 && (
                <span className={style.mobileListItemHeading}>Date:</span>
              )}
              <span>{log.created_at}</span>
            </span>
          </div>
        ))}

      {!loading && logs.length > 0 && (
        <div className={style.pagination}>
          <span
            onClick={() => {
              setPageChangeLoading(true);
              setCurrentPage(1);
            }}
            className={currentPage === 1 ? style.active : style.normal}
          >
            First Page
          </span>
          <span
            onClick={() => {
              if (currentPage < lastPage) {
                setCurrentPage(currentPage + 1);
              }
            }}
            disabled={currentPage === lastPage}
          >
            Next Page
          </span>
          <span className={style.active} disabled>
            {currentPage}
          </span>
          {/* {
          pageNumbers.map((page, index) => {
            return <span key={`${index}--key`}onClick={() => {
              setCurrentPage(page);
              setPageChangeLoading(true);
            }} 
            className={currentPage === page ? style.active : style.normal}>{page}</span>
          })
        }  */}
          <span
            onClick={() => {
              if (currentPage > firstPage) {
                setCurrentPage(currentPage - 1);
                setPageChangeLoading(true);
              }
            }}
          >
            Prev Page
          </span>
          <span
            onClick={() => {
              if (currentPage < lastPage) {
                setCurrentPage(lastPage);
                setPageChangeLoading(true);
              }
            }}
            className={currentPage === lastPage ? style.active : style.normal}
            disabled={currentPage === lastPage}
          >
            Last Page
          </span>
        </div>
      )}
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeCurrentPage: (payload) => dispatch(setCurrentPage(payload)),
  };
};

export default connect(undefined, mapDispatchToProps)(WalletLog);

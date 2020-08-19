import React from "react";

import styles from "./NotificationsPanel.module.scss";

export const NotificationsPanel = (props) => {
  return (
    <div className={styles.panel}>
      <p>
        Dear Agent, please fund your wallets by making deposits to this account:
        CICOSERVE PAYMENTS 0001192798 SUNTRUST BANK, please note that this is
        only temporary as we are working towards automating the process shortly.
      </p>
      <p>
        Dear Agent, please fund your wallets by making deposits to this account:
        CICOSERVE PAYMENTS 0001192798 SUNTRUST BANK, please note that this is
        only temporary as we are working towards automating the process shortly.
      </p>
    </div>
  );
};

export default NotificationsPanel;

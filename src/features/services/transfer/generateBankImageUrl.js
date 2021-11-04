import access from "../../../assets/images/accessbank.png";
import fidelity from "../../../assets/images/fidelitybank.svg";
import zenith from "../../../assets/images/zenith-bank-logo.svg";
import gtbank from "../../../assets/images/gtbank.svg";
import unity from "../../../assets/images/unity.svg";
import wema from "../../../assets/images/wema.svg";
import ecobank from "../../../assets/images/ecobank.svg";
import scbank from "../../../assets/images/schatered.svg";
import uba from "../../../assets/images/uba.svg";
import heritage from "../../../assets/images/heritage.svg";
import keystone from "../../../assets/images/keystone.svg";
import fcmb from "../../../assets/images/fcmb.svg";
import sterling from "../../../assets/images/Sterling Bank Plc Logo.svg";
import suntrust from "../../../assets/images/suntrust.svg";
import cico from "../../../assets/images/cico-logo.svg";

const generateBankImageUrl = (bankCode) => {
  switch (bankCode) {
    case "000014":
      return access;
    case "000007":
      return fidelity;
    case "000015":
      return zenith;
    case "000023":
      return gtbank;
    case "000011":
      return unity;
    case "000017":
      return wema;
    case "000010":
      return ecobank;
    case "000021":
      return scbank;
    case "000004":
      return uba;
    case "000020":
      return heritage;
    case "000002":
      return keystone;
    case "000003":
      return fcmb;
    case "000001":
      return sterling;
    case "000022":
      return suntrust;
    default:
      return cico;
  }
};

export default generateBankImageUrl;

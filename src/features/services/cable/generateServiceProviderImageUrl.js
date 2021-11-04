import dstv from "../../../assets/images/dstv.jpg";
import startimes from "../../../assets/images/startimes.png";
import gotv from "../../../assets/images/GOtv_Logo.png";

const generateBankImageUrl = (service) => {
  switch (service) {
    case "gotv":
      return gotv;
    case "startimes":
      return startimes;
    default:
      return dstv;
  }
};

export default generateBankImageUrl;

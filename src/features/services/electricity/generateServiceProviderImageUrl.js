import kedc from "../../../assets/icons/kedc.svg";
import kedco from "../../../assets/icons/kedco.svg";
import ikedc from "../../../assets/icons/ikedc.svg";
import eedc from "../../../assets/icons/eedc.svg";
import phdc from "../../../assets/icons/phdc.svg";
import aedc from "../../../assets/icons/aedc.svg";
import ekedc from "../../../assets/icons/ekedc.svg";
import ibedc from "../../../assets/images/IBEDC.png";

const generateBankImageUrl = (provider) => {
  switch (provider) {
    case "ikedc":
      return ikedc;
    case "ekedc":
      return ekedc;
    case "phdc":
      return phdc;
    case "kedc":
      return kedc;
    case "kedco":
      return kedco;
    case "eedc":
      return eedc;
    case "aedc":
      return aedc;
    case "ibedc":
      return ibedc;
    default:
      return ikedc;
  }
};

export default generateBankImageUrl;

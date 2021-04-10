import betway from "../../../assets/icons/Betway Logo.svg";
import bet9ja from "../../../assets/icons/Bet9ja Logo.svg";
import sportybet from "../../../assets/icons/SportyBet Logo.svg";
import nairabet from "../../../assets/icons/Nairabet Logo.svg";
import cloudbet from "../../../assets/icons/cloudbet.jpg";
import betting from "../../../assets/images/football.svg";

const generateProviderImageUrl = (service) => {
  switch (service) {
    case "cloudbet":
      return cloudbet;
    case "betway":
      return betway;
    case "bet9ja":
      return bet9ja;
    case "sportybet":
      return sportybet;
    case "nairabet":
      return nairabet;
    default:
      return betting;
  }
};

export default generateProviderImageUrl;

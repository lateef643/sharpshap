import mtn from '../../../assets/images/MTN Logo.svg';
import airtel from '../../../assets/images/Airtel.svg';
import glo from '../../../assets/images/glo.svg';
import ninemobile from '../../../assets/images/9mobile.svg';

const generateNetworkImageUrl = (network) => {
    switch (network) {
        case 'MTN':
            return mtn;
        case 'AIRTEL':
            return airtel;
        case 'GLO':
            return glo;
        case '9mobile':
            return ninemobile;
        default:
            return mtn;
    }
};

export default generateNetworkImageUrl;

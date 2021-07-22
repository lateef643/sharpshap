export const initialFormState = {
    beneficiaryBankCode: '',
    beneficiaryBankName: '',
    amount: '',
    accountNumber: '',
    accountName: '',
    phone: '',
    narration: '',
    total: '',
};

const FundsTransferReducer = (state, { type, payload }) => {
    switch (type) {
        case 'UPDATE_FORM_STATE':
            return { ...state, ...payload };
        default:
            return state;
    }
};

export default FundsTransferReducer;

// {"status":"00","message":"Account Found","data":{"name":"NOIBI KAZEEM ADEWALE","clientId":"NaN","bvn":"22166406689","account":{"id":"090110200506121759714896325490","number":"0024615656"},"status":"2","currency":"NGN","bank":"GTBank"}}

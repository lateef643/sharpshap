export const initialState = {
    first_name: '',
    last_name: '',
    user_name: '',
    date_of_birth: '',
    email: '',
    gender: '',
    business_name: '',
    business_address: '',
    business_phone: '',
    state_id: '',
    agent_type: '',
    local_government_id: '',
    account_number: '',
    account_name: '',
    bank_id: '',
    bvn: '',
    agent_code: '',
    identity_type: '',
    business_type: '',
    type: 'sub',
    mobile: '',
    utility_bill: '',
    guarantor_form: '',
    id_card: '',
    passport_photogtaph: '',
};

const agentDataReducer = (state, { type, payload }) => {
    switch (type) {
        case 'SET_AGENT_DATA':
            return { ...state, ...payload };

        default:
            return state;
    }
};

export default agentDataReducer;

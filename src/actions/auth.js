import history from '../utils/history';

export const loginUser = ({
    user,
    isAuthenticated,
    walletBalance,
    transactionSettings,
}) => {
    return {
        type: 'START_LOGIN_USER',
        payload: {
            isAuthenticated,
            user,
            walletBalance,
            transactionSettings,
        },
    };
};

export const logoutUser = () => {
    return {
        type: 'START_LOGOUT_USER',
    };
};

export const startLogout = () => (dispatch) => {
    dispatch({
        type: 'SET_LOADING',
        payload: {
            loading: false,
            message: undefined,
        },
    });

    sessionStorage.clear('user');
    sessionStorage.clear('token');
    sessionStorage.clear('balance');
    history.push('/');
    dispatch(logoutUser());
};

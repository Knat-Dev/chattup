import {
    SET_AUTHENTICATED,
    SET_USER,
    SET_ERRORS,
    CLEAR_ERRORS,
    LOGOUT,
    SET_USER_CHANNELS,
    SET_LOADING_USER_CHANNELS,
} from '../types';

const initialState = {
    authenticated: false,
    user: null,
    loading: false,
    errors: {},
    channels: {
        loading: true,
        list: [],
    },
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTHENTICATED:
            return { ...state, authenticated: true };
        case SET_USER_CHANNELS:
            return {
                ...state,
                channels: {
                    list: action.payload,
                    loading: false,
                },
            };
        case SET_LOADING_USER_CHANNELS:
            return { ...state, channels: { ...state.channels, loading: true } };
        case SET_USER:
            return { ...state, user: action.payload };
        case LOGOUT:
            return {
                ...initialState,
            };
        case SET_ERRORS:
            return {
                ...state,
                errors: action.payload,
            };
        case CLEAR_ERRORS:
            return {
                ...state,
                errors: {},
            };
        default:
            return state;
    }
};

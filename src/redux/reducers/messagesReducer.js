import {
    SET_MESSAGES,
    SET_LOADING_MESSAGES,
    POST_MESSAGE,
    CLEAR_MESSAGES,
} from '../types';

const initialState = {
    list: [],
    loading: true,
};

export default (state = initialState, { type, payload }) => {
    switch (type) {
        case SET_MESSAGES:
            return { list: payload, loading: false };
        case CLEAR_MESSAGES:
            return { ...initialState };
        case SET_LOADING_MESSAGES:
            return { ...state, loading: true };
        case POST_MESSAGE:
            return { ...state, list: [...state.list, payload] };
        default:
            return state;
    }
};

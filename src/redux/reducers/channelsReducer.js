import { SET_CHANNELS, SET_CHANNELS_LOADING, CLEAR_CHANNELS } from '../types';

const initialState = {
    list: [],
    loading: true,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNELS:
            return { list: action.payload, loading: false };
        case SET_CHANNELS_LOADING:
            return { ...state, loading: true };
        case CLEAR_CHANNELS: {
            return { ...initialState };
        }
        default:
            return state;
    }
};

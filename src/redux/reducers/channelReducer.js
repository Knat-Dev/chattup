import { SET_CHANNEL, CLEAR_CHANNEL } from '../types';

const initialState = {};

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CHANNEL:
            return { ...action.payload };
        case CLEAR_CHANNEL:
            return { ...initialState };
        default:
            return state;
    }
};

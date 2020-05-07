import { SET_CHANNEL } from '../types';
import { setMessages } from './messages';

export const setChannel = (channel) => (dispatch) => {
    dispatch({ type: SET_CHANNEL, payload: channel });
};

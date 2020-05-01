import { database } from '../../firebase';
import { SET_CHANNELS, SET_CHANNELS_LOADING } from '../types';

export const setChannels = (displayName) => (dispatch) => {
    dispatch({ type: SET_CHANNELS_LOADING });
    database.ref(`userChannel/${displayName}`).on('value', (snap) => {
        const userChannelIds = [];

        snap.forEach((childSnapshot) => {
            userChannelIds.push(childSnapshot.key);
        });

        let channelsRef = database.ref('channels');
        channelsRef.once('value', (snapshot) => {
            let channels = [];

            snapshot.forEach((childSnapshot) => {
                channels.push(childSnapshot.val());
            });
            channels = channels.filter((channel) => {
                return !userChannelIds.some((id) => {
                    return channel.channelId === id;
                });
            });

            dispatch({ type: SET_CHANNELS, payload: channels });
        });
    });
};

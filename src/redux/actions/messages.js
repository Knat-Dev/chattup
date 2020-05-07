import { SET_LOADING_MESSAGES, SET_MESSAGES, POST_MESSAGE } from '../types';
import { database } from '../../firebase';

// export const setMessages = (channelId, length) => (dispatch) => {
//     console.log(channelId);
//     dispatch({ type: SET_LOADING_MESSAGES });
//     const messagesRef = database.ref(`messages/${channelId}`);
//     messagesRef.on('value', (snap) => {
//         const messages = [];
//         snap.forEach((childSnap) => {
//             messages.push(childSnap.val());
//         });
//         console.log('Messages Length: ' + messages.length);
//         dispatch({ type: SET_MESSAGES, payload: messages });
//     });
// };

export const setMessages = (messages) => (dispatch) => {
    dispatch({ type: SET_MESSAGES, payload: messages });
};

export const postMessageToChannel = (messageObject, scrollBottom) => (
    dispatch
) => {
    const { channelId, displayName, photoURL, body } = messageObject;
    const newMessage = {
        displayName,
        body,
        photoURL,
        createdAt: new Date().toISOString(),
    };
    const messagesRef = database.ref(`messages/${channelId}`);
    messagesRef.push().then((ref) => {
        ref.set(newMessage).then(() => {
            dispatch({ type: POST_MESSAGE, payload: newMessage });
            scrollBottom();
        });
    });
};

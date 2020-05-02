import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';
import { firebase } from './firebase';
import { setUser, setUserChannels, setUserStatus } from './redux/actions/user';
import {
    SET_AUTHENTICATED,
    CLEAR_CHANNELS,
    CLEAR_CHANNEL,
    CLEAR_MESSAGES,
} from './redux/types';
import LoadingPage from './components/util/LoadingPage';
import { setChannels } from './redux/actions/channels';
import { setChannel } from './redux/actions/channel';
ReactDOM.render(<LoadingPage />, document.getElementById('root'));

const jsx = (
    <Provider store={store}>
        <App />
    </Provider>
);

let hasRendered = false;
const renderApp = () => {
    if (!hasRendered) {
        ReactDOM.render(jsx, document.getElementById('root'));
        hasRendered = true;
    }
};

firebase.auth().onAuthStateChanged((user) => {
    if (user) {
        store.dispatch(setUser(user));
        store.dispatch({ type: SET_AUTHENTICATED });
        if (user.displayName) {
            console.log('Logged in');
            console.log(user.displayName);
            store.dispatch(setUserStatus(user.displayName));
            store.dispatch(setUserChannels(user.displayName));
            store.dispatch(setChannels(store.getState().user.user.displayName));
        }
        renderApp();
    } else {
        console.log('Logged out');
        store.dispatch({ type: CLEAR_CHANNELS });
        store.dispatch({ type: CLEAR_CHANNEL });
        store.dispatch({ type: CLEAR_MESSAGES });
        renderApp();
    }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import store from './redux/store';
import { Provider } from 'react-redux';
import { firebase } from './firebase';
import { setUser } from './redux/actions/user';
import { SET_AUTHENTICATED } from './redux/types';
import LoadingPage from './components/util/LoadingPage';
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
    console.log('logged in');
    store.dispatch(setUser(user));
    store.dispatch({ type: SET_AUTHENTICATED });
    renderApp();
  } else {
    console.log('logged out');

    renderApp();
  }
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

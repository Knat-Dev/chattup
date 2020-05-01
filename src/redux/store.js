import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../redux/reducers/userReducer';
import channelsReducer from './reducers/channelsReducer';
import channelReducer from './reducers/channelReducer';
import messagesReducer from './reducers/messagesReducer';

const initialState = {};

const middlware = [thunk];

const reducers = combineReducers({
    user: userReducer,
    channels: channelsReducer,
    channel: channelReducer,
    messages: messagesReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
    reducers,
    initialState,
    composeEnhancers(applyMiddleware(...middlware))
);
export default store;

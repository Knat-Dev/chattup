import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from '../redux/reducers/userReducer';

const initialState = {};

const middlware = [thunk];

const reducers = combineReducers({
  user: userReducer,
});
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  initialState,
  composeEnhancers(applyMiddleware(...middlware))
);
export default store;

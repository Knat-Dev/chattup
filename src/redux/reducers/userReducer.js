import {
  SET_AUTHENTICATED,
  SET_USER,
  SET_ERRORS,
  CLEAR_ERRORS,
  LOGOUT,
} from '../types';

const initialState = {
  authenticated: false,
  user: null,
  loading: false,
  errors: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return { ...state, authenticated: true };

    case SET_USER:
      return { ...state, user: action.payload };
    case LOGOUT:
      return {
        ...initialState,
      };
    case SET_ERRORS:
      return {
        ...state,
        errors: action.payload,
      };
    case CLEAR_ERRORS:
      return {
        ...state,
        errors: {},
      };
    default:
      return state;
  }
};

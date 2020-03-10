import { LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED, LOGOUT } from './types';

const initialState = {
  user: null,
  authenticated: false,
  loading: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, loading: true };
    case LOGIN_SUCCESSFUL:
      return {
        ...state,
        loading: false,
        user: action.payload,
        authenticated: true,
      };
    case LOGIN_FAILED:
      return { ...state, loading: false, error: action.payload };
    case LOGOUT:
      return { ...state, user: null, authenticated: false };
    default:
      return state;
  }
};

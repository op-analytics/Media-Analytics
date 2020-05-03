// Actions
export const POST_SIGNUP = 'user/POST_SIGNUP';
const POST_SIGNUP_SUCCESS = 'user/POST_SIGNUP_SUCCESS';

export const POST_LOGIN = 'user/POST_LOGIN';
const POST_LOGIN_SUCCESS = 'user/POST_LOGIN_SUCCESS';

export const GET_USER = 'user/GET_USER';
const GET_USER_SUCCESS = 'user/GET_USER_SUCCESS';

export const SET_TOKEN = 'user/SET_TOKEN';

export const FETCH_FAILURE = 'user/FETCH_FAILURE';

const AUTHENTICATE = 'user/AUTHENTICATE';
export const UNAUTHENTICATE = 'user/UNAUTHENTICATE';

const initialState = {
  user: null,
  authenticated: false,
  loading: false,
  errors: [],
};
// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case POST_SIGNUP:
      return { ...state, loading: true };
    case POST_SIGNUP_SUCCESS:
      return { ...state, loading: false, errors: [] };

    case POST_LOGIN:
      return { ...state, loading: true };
    case POST_LOGIN_SUCCESS:
      return { ...state, loading: false, errors: [] };

    case GET_USER:
      return { ...state, loading: true };

    case GET_USER_SUCCESS:
      return { ...state, loading: false, user: action.payload, errors: [] };

    case AUTHENTICATE:
      return { ...state, authenticated: true };
    case UNAUTHENTICATE:
      return { ...state, authenticated: false };

    case FETCH_FAILURE:
      return { ...state, loading: false, errors: action.payload };
    default:
      return state;
  }
}

// Action Creators
export const signup = (name, email, password, confirmedPassword) => ({
  type: POST_SIGNUP,
  payload: { name, email, password, confirmPassword: confirmedPassword },
});
export const signupSuccess = () => ({ type: POST_SIGNUP_SUCCESS });

export const login = (email, password) => ({
  type: POST_LOGIN,
  payload: { email, password },
});
export const loginSuccess = () => ({ type: POST_LOGIN_SUCCESS });

export const getUser = () => ({
  type: GET_USER,
});
export const getUserSuccess = user => ({
  type: GET_USER_SUCCESS,
  payload: user,
});

export const fetchFailure = error => ({ type: FETCH_FAILURE, payload: error });

export const authenticate = () => ({ type: AUTHENTICATE });
export const unauthenticate = () => ({ type: UNAUTHENTICATE });

export const setToken = token => ({ type: SET_TOKEN, payload: token });

import axios from 'axios';
import { push } from 'connected-react-router';
import { call, fork, put, takeLatest } from 'redux-saga/effects';

import {
  UNAUTHENTICATE,
  authenticate,
  fetchFailure,
  getUser,
  getUserSuccess,
  GET_USER,
  loginSuccess,
  POST_LOGIN,
  POST_SIGNUP,
  setToken,
  SET_TOKEN,
  signupSuccess,
} from '.';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_API_URL;

function* fetchUser() {
  try {
    const { data: user } = yield call(axios.get, `${API_URL}/auth/user`);
    yield put(getUserSuccess(user));
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

function* authenticateAndGetUser(token) {
  yield put(setToken(token));
  yield put(authenticate());
  yield put(getUser());
  yield put(push('/'));
}

function* signup(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${API_URL}/auth/signup`,
      action.payload,
    );
    const { token } = data;
    yield put(signupSuccess());
    yield authenticateAndGetUser(token);
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

function* login(action) {
  try {
    const { data } = yield call(
      axios.post,
      `${API_URL}/auth/login`,
      action.payload,
    );
    const { token } = data;
    yield put(loginSuccess());
    yield authenticateAndGetUser(token);
  } catch (err) {
    yield put(fetchFailure(err));
  }
}

function setTokenHeaders(action) {
  const XAuthToken = `Bearer ${action.payload}`;
  localStorage.setItem('XAuthToken', XAuthToken);
  axios.defaults.headers.common.Authorization = XAuthToken;
}

function removeToken() {
  localStorage.removeItem('XAuthToken');
  delete axios.defaults.headers.common.Authorization;
  window.location.reload();
}

function* watchGetUser() {
  yield takeLatest(GET_USER, fetchUser);
}
function* watchSignup() {
  yield takeLatest(POST_SIGNUP, signup);
}
function* watchLogin() {
  yield takeLatest(POST_LOGIN, login);
}
function* watchSetToken() {
  yield takeLatest(SET_TOKEN, setTokenHeaders);
}

function* watchUnauthenticate() {
  yield takeLatest(UNAUTHENTICATE, removeToken);
}

export default [
  fork(watchSetToken),
  fork(watchSignup),
  fork(watchLogin),
  fork(watchGetUser),
  fork(watchUnauthenticate),
];

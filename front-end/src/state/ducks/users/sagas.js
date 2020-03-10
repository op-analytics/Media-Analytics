import axios from 'axios';
import { put, takeEvery, call } from 'redux-saga/effects';
import { LOGIN, LOGOUT } from './types';
import { loginSuccessful, loginFailed } from './actions';

const API_URL =
  process.env.NODE_ENV === 'production'
    ? '/api/auth'
    : `${process.env.REACT_APP_API_URL}/auth`;

const setAuthorizationHeader = token => {
  const XAuthToken = `Bearer ${token}`;
  localStorage.setItem('XAuthToken', XAuthToken);
  axios.defaults.headers.common.Authorization = XAuthToken;
};

export function* loginSaga({ payload }) {
  const { email, password } = payload;
  try {
    const { token } = yield call(() =>
      axios.post(`${API_URL}/login`, { email, password }),
    );
    setAuthorizationHeader(token);
    const user = yield call(() => axios.get(`${API_URL}/user`));
    yield put(loginSuccessful(user));
  } catch (err) {
    yield put(loginFailed(err));
  }
}

export async function* loginWatcher() {
  yield takeEvery(LOGIN, loginSaga);
}

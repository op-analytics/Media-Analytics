import axios from 'axios';
import { call, fork, put, takeEvery } from 'redux-saga/effects';
import {
  getAssociationFailure,
  getAssociationSuccess,
  getFrequencyFailure,
  getFrequencySuccess,
  GET_ASSOCIATION,
  GET_FREQUENCY,
} from '.';

const API_URL =
  process.env.NODE_ENV === 'production' ? '/api' : process.env.REACT_APP_API_URL;

function* fetchFrequencies(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/timeline/frequency`,
      action.payload,
    );
    yield put(getFrequencySuccess(response.data));
  } catch (err) {
    yield put(getFrequencyFailure(err));
  }
}

function* fetchAssociations(action) {
  try {
    const response = yield call(
      axios.post,
      `${API_URL}/timeline/latent-association`,
      action.payload,
    );
    yield put(getAssociationSuccess(response.data.data));
  } catch (err) {
    yield put(getAssociationFailure(err));
  }
}

function* watchGetFrequencies() {
  yield takeEvery(GET_FREQUENCY, fetchFrequencies);
}

function* watchGetAssociations() {
  yield takeEvery(GET_ASSOCIATION, fetchAssociations);
}

export default [fork(watchGetFrequencies), fork(watchGetAssociations)];

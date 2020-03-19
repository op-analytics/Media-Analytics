import { all } from 'redux-saga/effects';
import timelineSagas from './ducks/timeline/sagas';
import userSagas from './ducks/user/sagas';

export default function* rootSagas() {
  try {
    yield all([...timelineSagas, ...userSagas]);
  } catch (e) {
    //eslint-disable-next-line no-console
    console.log('Error:', e);
  }
}

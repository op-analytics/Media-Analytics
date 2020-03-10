import {all} from 'redux-saga/effects'
import {userSagas} from './ducks/users'

export default function* rootSaga (){
  yield all([userSagas.loginWatcher()])
}
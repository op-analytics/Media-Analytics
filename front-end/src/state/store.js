import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './rootSaga'

import user from './ducks/users/reducer';

const initialState = {};

const sagaMiddleware = createSagaMiddleware()

const reducers = combineReducers({
  user,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(sagaMiddleware));

const store = createStore(reducers, initialState, enhancer);

sagaMiddleware.run(rootSaga)
export default store;
import { connectRouter, routerMiddleware } from 'connected-react-router';
import * as History from 'history';
import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import createSagaMiddleware from 'redux-saga';
import timeline from './ducks/timeline';
import user from './ducks/user';
import rootSaga from './rootSaga';

export const history = History.createBrowserHistory();
const initialState = {};

const sagaMiddleware = createSagaMiddleware();
const middleware = [sagaMiddleware, routerMiddleware(history)];

const reducers = combineReducers({
  router: connectRouter(history),
  timeline,
  user,
});

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true })
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, enhancer);

sagaMiddleware.run(rootSaga);

export default store;

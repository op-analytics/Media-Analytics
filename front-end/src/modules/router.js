import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';
import { reducer } from 'easy-peasy';

const isDevelopment = process.env.NODE_ENV === 'development';

const {
  createReduxHistory,
  routerMiddleware,
  routerReducer,
} = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: isDevelopment,
});

export default reducer(routerReducer);
export { routerMiddleware, createReduxHistory };

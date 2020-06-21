import { reducer } from 'easy-peasy';
import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

const isDevelopment = process.env.NODE_ENV === 'development';

// Setup for redux-first-history. Used in the easy peasy store
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

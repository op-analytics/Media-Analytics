import { createBrowserHistory } from 'history';
import { createReduxHistoryContext } from 'redux-first-history';

const isDevelopment = process.env.NODE_ENV === 'development';

const {
  createReduxHistory,
  routerMiddleware,
  routerModel,
} = createReduxHistoryContext({
  history: createBrowserHistory(),
  reduxTravelling: isDevelopment,
});

export default routerModel;
export { routerMiddleware, createReduxHistory };

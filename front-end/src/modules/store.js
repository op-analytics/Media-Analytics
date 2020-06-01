import { createStore } from 'easy-peasy';
import user from './user';
import timeline from './timeline';
import router, { routerMiddleware, createReduxHistory } from './router';

const store = createStore(
  {
    timeline,
    user,
    router,
  },
  {
    devTools: true,
    middleware: [routerMiddleware],
  },
);

export const history = createReduxHistory(store);

export default store;

import { createStore } from 'easy-peasy';

import router, { createReduxHistory,routerMiddleware } from './router';
import timeline from './timeline';
import user from './user';

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

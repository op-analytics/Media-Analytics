import { createStore } from 'easy-peasy';

import router, { createReduxHistory,routerMiddleware } from './router';
import timeline from './timeline';
import ui from './ui';
import user from './user';

const isDevelopment = process.env.NODE_ENV === 'development';

// Easy peasy store used for global state management
const store = createStore(
  {
    timeline,
    ui,
    user,
    router,
  },
  {
    devTools: isDevelopment,
    middleware: [routerMiddleware],
  },
);

// History managed and watched by the store for use with react-router-dom
export const history = createReduxHistory(store);

export default store;

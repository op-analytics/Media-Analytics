import { createStore } from 'easy-peasy';
import user from './user';
import timeline from './timeline';

const store = createStore({
  timeline,
  user,
});

export default store;

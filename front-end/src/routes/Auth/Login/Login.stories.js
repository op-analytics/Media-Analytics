import { action,createStore, StoreProvider } from 'easy-peasy';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Login from './Login';

const initialState = {
  user: {
    logout: action(() => ({})),
    login: action(() => ({})),
    errors: [],
  },
};
const store = createStore(initialState);

export default {
  title: 'Routes/Auth',
  component: Login,
  // eslint-disable-next-line react/display-name
  decorators: [
    storyFn => (
      <StoreProvider store={store}>
        <Router>{storyFn()}</Router>
      </StoreProvider>
    ),
  ],
};

export const LoginForm = () => <Login />;

import React from 'react';
import { StoreProvider, createStore, action } from 'easy-peasy';
import { BrowserRouter as Router } from 'react-router-dom';
import Signup from './Signup';

const initialState = {
  user: {
    signup: action(() => ({})),
    errors: [],
  },
};

const store = createStore(initialState);

export default {
  title: 'Routes/Auth',
  component: Signup,
  // eslint-disable-next-line react/display-name
  decorators: [
    storyFn => (
      <StoreProvider store={store}>
        <Router>{storyFn()}</Router>
      </StoreProvider>
    ),
  ],
};

export const SignupForm = () => <Signup />;

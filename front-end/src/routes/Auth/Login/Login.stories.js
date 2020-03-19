import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Login from './Login';

const mockStore = configureStore();

const initialState = {};

const store = mockStore(initialState);
export default {
  title: 'Routes/Auth',
  component: Login,
  //eslint-disable-next-line react/display-name
  decorators: [storyFn => <Provider store={store}>{storyFn()}</Provider>],
};

export const LoginForm = () => <Login />;

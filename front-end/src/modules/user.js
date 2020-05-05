/* eslint-disable no-param-reassign */
import { thunk, action, computed } from 'easy-peasy';
import userService from '../services/user';
import { getErrorsFromResponse } from './shared/errorHelpers';

const userModel = {
  // User state
  user: null,
  errors: [],

  // Computed properties
  authenticated: computed(state => state.user != null),

  authenticating: computed(state => {
    const userIsUnauthenticated = state.user === null;
    const weHaveAToken = localStorage.getItem('XAuthToken');
    return userIsUnauthenticated && weHaveAToken;
  }),

  // Actions and thunks
  login: thunk(async (actions, payload) => {
    try {
      const token = await userService.login(payload);
      await userService.authenticate(token);
      const user = await userService.getLoggedInUser();
      actions.setUser(user);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      actions.setErrors(errors);
    }
  }),

  signup: thunk(async (actions, payload) => {
    try {
      const token = await userService.signup(payload);
      await userService.authenticate(token);
      const user = await userService.getLoggedInUser();
      actions.setUser(user);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      actions.setErrors(errors);
    }
  }),

  logout: thunk(async actions => {
    userService.logout();
    actions.setUser(null);
    window.location.reload();
  }),

  setErrors: action((state, payload) => {
    state.errors = payload;
  }),

  setUser: action((state, payload) => {
    state.user = payload;
  }),
};

export default userModel;

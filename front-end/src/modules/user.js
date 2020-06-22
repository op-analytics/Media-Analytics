/* eslint-disable no-param-reassign */
import { action, computed, thunk } from 'easy-peasy';
import { push } from 'redux-first-history';

import userService from '../services/user';
import { getErrorsFromResponse } from './shared/errorHelpers';

/**
 * The timeline model for the easy peasy store.
 * If you don't understand this go take a look at some easy peasy tutorials
 */
const userModel = {
  // User state
  user: null,

  // Computed properties
  // Property to check if the current user is authenticated
  authenticated: computed((state) => state.user != null),

  // Property to check if the current user is being authenticated
  authenticating: computed((state) => {
    // FIXME: This needs to have a check if the token was invalid to stop the
    // page not loading
    const userIsUnauthenticated = state.user === null;
    const weHaveAToken = localStorage.getItem('XAuthToken');
    return userIsUnauthenticated && weHaveAToken;
  }),

  // Actions and thunks
  login: thunk(async (actions, payload, { getStoreActions }) => {
    const { ui } = getStoreActions();
    ui.clearErrors();
    try {
      const token = await userService.login(payload);
      await userService.authenticate(token);
      const user = await userService.getLoggedInUser();
      actions.setUser(user);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      ui.setErrors(errors);
    }
  }),

  authenticate: thunk(async (actions, payload, { getStoreActions }) => {
    const { ui } = getStoreActions();
    ui.clearErrors();
    try {
      await userService.authenticate(payload);
      const user = await userService.getLoggedInUser();
      actions.setUser(user);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      ui.setErrors(errors);
    }
  }),

  signup: thunk(async (actions, payload, { dispatch, getStoreActions }) => {
    const { ui } = getStoreActions();
    ui.clearErrors();
    try {
      await userService.signup(payload);
      dispatch(push('/confirmation'));
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      ui.setErrors(errors);
    }
  }),

  resendConfirmationEmail: thunk(
    async (actions, payload, { dispatch, getStoreActions }) => {
      const { ui } = getStoreActions();
      ui.clearErrors();
      try {
        await userService.resendEmail(payload);
        dispatch(push('/confirmation'));
      } catch ({ response }) {
        const errors = getErrorsFromResponse(response);
        ui.setErrors(errors);
      }
    },
  ),

  logout: thunk(async (actions) => {
    userService.logout();
    actions.setUser(null);
  }),

  setErrors: action((state, payload) => {
    state.errors = payload;
  }),

  setUser: action((state, payload) => {
    state.user = payload;
  }),
};

export default userModel;

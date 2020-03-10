import {LOGIN, LOGIN_SUCCESSFUL, LOGIN_FAILED} from './types'

export const login = (email, password) => ({
  type: LOGIN,
  payload: { email, password },
});

export const loginSuccessful = (user) => ({
  type: LOGIN_SUCCESSFUL,
  payload: user
})

export const loginFailed = (error) => ({
  type: LOGIN_FAILED,
  payload: error,
});
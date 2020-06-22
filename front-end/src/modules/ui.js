/* eslint-disable no-param-reassign */
import { action, thunkOn } from 'easy-peasy';

const ROUTER_LOCATION_CHANGE = "@@router/LOCATION_CHANGE"

const uiModel = {
  // UI state
  errors: [],
  loading: false,

  // On route change action reset errors
  listeners: thunkOn(() => [ROUTER_LOCATION_CHANGE],(actions)=>{
    actions.clearErrors()
  }),

  setErrors: action((state, payload) => {
    state.errors = payload;
  }),

  clearErrors: action((state) => {
    state.errors = [];
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),
};

export default uiModel;

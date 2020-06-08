/* eslint-disable no-param-reassign */
import { thunk, action } from 'easy-peasy';
import timelineService from '../services/timeline';
import { getErrorsFromResponse } from './shared/errorHelpers';

const timelineModel = {
  // Timeline state
  errors: [],
  loading: false,
  frequencies: [],
  associations: [],
  sentiments: [],

  // Actions and thunks
  getAssociations: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setAssociations([])
    actions.setErrors([])
    try {
      const associations = await timelineService.getAssociations(payload);
      actions.setAssociations(associations);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      actions.setErrors(errors);
    }
    actions.setLoading(false);
  }),

  getFrequencies: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setFrequencies([])
    actions.setErrors([])
    try {
      const frequencies = await timelineService.getFrequencies(payload);
      actions.setFrequencies(frequencies);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      actions.setErrors(errors);
    }
    actions.setLoading(false);
  }),

  getSentiments: thunk(async (actions, payload) => {
    actions.setLoading(true);
    actions.setSentiments([])
    actions.setErrors([])
    try {
      const sentiments = await timelineService.getSentiments(payload);
      const cleanedSentiments = sentiments.map(dataset => ({
        title: dataset.word,
        data: dataset.data,
      }));
      actions.setSentiments(cleanedSentiments);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      actions.setErrors(errors);
    }
    actions.setLoading(false);
  }),

  setLoading: action((state, payload) => {
    state.loading = payload;
  }),

  setFrequencies: action((state, payload) => {
    state.frequencies = payload;
  }),

  setAssociations: action((state, payload) => {
    state.associations = payload;
  }),

  setSentiments: action((state, payload) => {
    state.sentiments = payload;
  }),

  setErrors: action((state, payload) => {
    state.errors = payload;
  }),
};

export default timelineModel;

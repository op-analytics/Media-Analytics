/* eslint-disable no-param-reassign */
import { action, thunk } from 'easy-peasy';

import timelineService from '../services/timeline';
import { getErrorsFromResponse } from './shared/errorHelpers';

/**
 * The timeline model for the easy peasy store
 * If you don't understand this go take a look at some easy peasy tutorials
 */
const timelineModel = {
  // Timeline state
  frequencies: [],
  associations: [],
  sentiments: [],

  // Actions and thunks
  getAssociations: thunk(async (actions, payload, { getStoreActions }) => {
    const { ui } = getStoreActions();
    ui.clearErrors();
    ui.setLoading(true);
    actions.setAssociations([]);
    try {
      const associations = await timelineService.getAssociations(payload);
      actions.setAssociations(associations);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      ui.setErrors(errors);
    }
    ui.setLoading(false);
  }),

  getFrequencies: thunk(async (actions, payload, { getStoreActions }) => {
    const { ui } = getStoreActions();
    ui.clearErrors();
    ui.setLoading(true);
    actions.setFrequencies([]);
    try {
      const frequencies = await timelineService.getFrequencies(payload);
      actions.setFrequencies(frequencies);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      ui.setErrors(errors);
    }
    ui.setLoading(false);
  }),

  getSentiments: thunk(async (actions, payload, { getStoreActions }) => {
    const { ui } = getStoreActions();
    ui.clearErrors();
    ui.setLoading(true);
    actions.setSentiments([]);
    try {
      const sentiments = await timelineService.getSentiments(payload);
      const cleanedSentiments = sentiments.map((dataset) => ({
        title: dataset.word,
        data: dataset.data,
      }));
      actions.setSentiments(cleanedSentiments);
    } catch ({ response }) {
      const errors = getErrorsFromResponse(response);
      ui.setErrors(errors);
    }
    ui.setLoading(false);
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

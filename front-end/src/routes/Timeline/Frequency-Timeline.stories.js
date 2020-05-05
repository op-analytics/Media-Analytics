import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Timeline from './Frequency.view';

const mockStore = configureStore();

const initialState = {
  timeline: {
    frequencies: [
      {
        title: 'cat',
        data: [
          { year: 1990, rank: 400, count: 1000, freq: 0.083 },
          { year: 1991, rank: 400, count: 800, freq: 0.063 },
        ],
      },
    ],
  },
};

const store = mockStore(initialState);

export default {
  title: 'Timeline/Frequency',
  component: Timeline,
  // eslint-disable-next-line react/display-name
  decorators: [storyFn => <Provider store={store}>{storyFn()}</Provider>],
};

export const FrequencyTimeline = () => <Timeline />;

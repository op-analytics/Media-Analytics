import { action,createStore, StoreProvider } from 'easy-peasy';
import React from 'react';

import Timeline from './Frequency.view';

const initialState = {
  timeline: {
    getFrequencies: action(() => ({})),
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

const store = createStore(initialState);

export default {
  title: 'Timeline/Frequency',
  component: Timeline,
  // eslint-disable-next-line react/display-name
  decorators: [
    storyFn => <StoreProvider store={store}>{storyFn()}</StoreProvider>,
  ],
};

export const FrequencyTimeline = () => <Timeline />;

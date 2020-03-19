import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import Timeline from './Latent-Association.view';

const mockStore = configureStore();

const initialState = {
  timeline: {
    associations: [{ year_range: '1990-1994', association: 0.3209838560784504 }],
  },
};
const store = mockStore(initialState);

export default {
  title: 'Timeline/LatentAssociation',
  component: Timeline,
  //eslint-disable-next-line react/display-name
  decorators: [storyFn => <Provider store={store}>{storyFn()}</Provider>],
};

export const LantentAssociationTimeline = () => <Timeline />;

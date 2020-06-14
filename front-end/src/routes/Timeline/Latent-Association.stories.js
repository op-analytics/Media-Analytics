import { action,createStore, StoreProvider } from 'easy-peasy';
import React from 'react';

import Timeline from './Latent-Association.view';

const initialState = {
  timeline: {
    getAssociations: action(() => ({})),
    associations: [{ year_range: '1990-1994', association: 0.3209838560784504 }],
  },
};
const store = createStore(initialState);

export default {
  title: 'Timeline/LatentAssociation',
  component: Timeline,
  // eslint-disable-next-line react/display-name
  decorators: [
    storyFn => <StoreProvider store={store}>{storyFn()}</StoreProvider>,
  ],
};

export const LantentAssociationTimeline = () => <Timeline />;

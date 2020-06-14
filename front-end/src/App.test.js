import { action,createStore, StoreProvider } from 'easy-peasy';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';

import App from './App';

const initialState = {
  user: { authenticated: true, logout: action(() => ({})) },
  timeline: {
    loading: false,
    frequencies: [],
    associations: [],
    getFrequencies: action(() => ({})),
  },
};

const store = createStore(initialState);

const getWrapped = () => (
  <StoreProvider store={store}>
    <Router>
      <App />
    </Router>
  </StoreProvider>
);

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(getWrapped(), div);
  ReactDOM.unmountComponentAtNode(div);
});

import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './App';

const mockStore = configureStore();

const initialState = {
  user: { authenticated: true },
  timeline: { loading: false, frequencies: [], associations: [] },
};

const store = mockStore(initialState);

const getWrapped = () => {
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>;
};

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(getWrapped(), div);
  ReactDOM.unmountComponentAtNode(div);
});

import axios from 'axios';
import { ConnectedRouter } from 'connected-react-router';
import jwtDecode from 'jwt-decode';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { authenticate, getUser, unauthenticate } from './state/ducks/user';
import store, { history } from './state/store';

// NOTE: This has to be done here to prevent user being unauthenticated on
// render
// Check if token is still valid
const token = localStorage.XAuthToken;
if (token) {
  const decodedToken = jwtDecode(token);
  if (decodedToken.exp * 1000 < Date.now()) {
    store.dispatch(unauthenticate());
    window.location.href = '/login';
  } else {
    store.dispatch(authenticate());
    axios.defaults.headers.common.Authorization = token;
    store.dispatch(getUser());
  }
}

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <App />
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

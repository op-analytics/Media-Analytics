import './index.css';

import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import { StoreProvider } from 'easy-peasy';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router } from 'react-router-dom';

import App from './App';
import store, { history } from './modules/store';
import * as serviceWorker from './serviceWorker';

const muiTheme = createMuiTheme({
  palette: {
    primary: blue,
  },
});

ReactDOM.render(
  <StoreProvider store={store}>
    <Router history={history}>
      <ThemeProvider theme={muiTheme}>
        <App />
      </ThemeProvider>
    </Router>
  </StoreProvider>,
  document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

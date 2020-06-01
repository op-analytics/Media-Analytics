import { Router } from 'react-router-dom';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import blue from '@material-ui/core/colors/blue';
import React from 'react';
import ReactDOM from 'react-dom';
import { StoreProvider } from 'easy-peasy';
import App from './App';
import './index.css';
import * as serviceWorker from './serviceWorker';
import store, { history } from './modules/store';

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

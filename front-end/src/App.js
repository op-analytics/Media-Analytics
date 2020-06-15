import { useStoreActions, useStoreDispatch, useStoreState } from 'easy-peasy';
import jwtDecode from 'jwt-decode';
import React, { useCallback, useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { push } from 'redux-first-history';

import LoggedInRoute from './components/Auth/LoggedInRoute';
import LoggedOutRoute from './components/Auth/LoggedOutRoute';
import Nav from './components/Nav';
import About from './routes/About';
import Confirmation from './routes/Auth/Confirmation';
//
// Routes
import Login from './routes/Auth/Login';
import Resend from './routes/Auth/Resend';
import Signup from './routes/Auth/Signup';
import NotFound from './routes/NotFound.view';
import FrequencyTimeline from './routes/Timeline/Frequency.view';
import LatentAssociationTimeline from './routes/Timeline/Latent-Association.view';
import UserGuide from './routes/UserGuide'

// Links to show on the side bar
// Each sub array will have a divider separating them
const links = [
  [
    { href: '/frequency', text: 'Frequency Counts' },
    { href: '/latent-association', text: 'Latent Associations' },
  ],
  [
    { href: '/about', text: 'About' },
    { href: '/user-guide', text: 'User Guide' },
  ],
];

/**
 * The main app component
 * @component
 */
function App() {
  const logout = useStoreActions(store => store.user.logout);
  const authenticate = useStoreActions(store => store.user.authenticate);
  const authenticating = useStoreState(store => store.user.authenticating);
  const dispatch = useStoreDispatch();
  const redirect = useCallback(path => dispatch(push(path)), [dispatch]);
  const location = useStoreState(store => store.router.location);

  useEffect(() => {
    const token = localStorage.XAuthToken;
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        logout();
        redirect('/login');
      } else authenticate(token);
    }
  }, [logout, authenticate, redirect]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, [location]);

  return (
    !authenticating && (
      <Nav title="Media-Analytics.org" links={links}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/frequency" />} />
          <LoggedOutRoute path="/confirmation" component={Confirmation} />
          <LoggedOutRoute path="/resend" component={Resend} />
          <LoggedOutRoute path="/signup" component={Signup} />
          <LoggedOutRoute path="/login" component={Login} />
          <Route path="/about" component={About} />
          <Route path="/user-guide" component={UserGuide} />
          <LoggedInRoute path="/frequency" component={FrequencyTimeline} />
          <LoggedInRoute
            path="/latent-association"
            component={LatentAssociationTimeline}
          />
          <Route component={NotFound} />
        </Switch>
      </Nav>
    )
  );
}

export default App;

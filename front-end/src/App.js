import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Nav from './components/Nav';

// Routes
import Login from './routes/Auth/Login';
import Signup from './routes/Auth/Signup';
import FrequencyTimeline from './routes/Timeline/Frequency.view';
import LatentAssociationTimeline from './routes/Timeline/Latent-Association.view';
import NotFound from './routes/NotFound.view';
import LoggedInRoute from './components/Auth/LoggedInRoute';
import LoggedOutRoute from './components/Auth/LoggedOutRoute';

// Links to show on the side bar
// Each sub array will have a divider separating them
const links = [
  [
    { href: '/frequency', text: 'Frequency Over Time' },
    { href: '/latent-association', text: 'Latent Association Over Time' },
  ],
  [
    { href: '/about', text: 'About' },
    { href: '/docs', text: 'Docs' },
    { href: '/paper', text: 'Paper' },
  ],
];

/**
 * The main app component
 * @component
 */
function App() {
  return (
    <Nav title="Media-Analytics.org" links={links}>
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/frequency" />} />
        <LoggedOutRoute path="/signup" component={Signup} />
        <LoggedOutRoute path="/login" component={Login} />
        <LoggedInRoute path="/frequency" component={FrequencyTimeline} />
        <LoggedInRoute
          path="/latent-association"
          component={LatentAssociationTimeline}
        />
        <Route component={NotFound} />
      </Switch>
    </Nav>
  );
}

export default App;

import React from 'react';
import {BrowserRouter as Router, Redirect, Route, Switch} from 'react-router-dom';
import './App.css';
import Nav from './Shared/Nav';
import FrequencyTimeline from './Timeline/Frequency-Timeline-view';
import LatentAssociationTimeline from './Timeline/Latent-Association-view';
import SentimentTimeline from './Timeline/Sentiment-Timeline-view';

function NotFound() {
  return (
    <div className="App">
      <h1>Not found</h1>
    </div>
  );
}

const links = [
  [
    { href: '/frequency', text: 'Frequency Over Time' },
    { href: '/sentiment', text: 'Sentiment Over Time' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association Over Time' },
  ],
  [
    { href: '/about', text: 'About' },
    { href: '/docs', text: 'Docs' },
    { href: '/paper', text: 'Paper' },
  ],
];

export default function App() {
  return (
    <Router>
      <Nav title="NYT Analytics" links={links}>
        <Switch>
          <Route exact path="/" render={() => <Redirect to="/frequency" />} />
          <Route path="/frequency" component={FrequencyTimeline} />
          <Route path="/sentiment" component={SentimentTimeline} />
          <Route
            path="/latent-association"
            component={LatentAssociationTimeline}
          />
          <Route component={NotFound} />
        </Switch>
      </Nav>
    </Router>
  );
}

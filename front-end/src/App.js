import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import FrequencyTimeline from './Timeline/Frequency-Timeline-view';
import SentimentTimeline from './Timeline/Sentiment-Timeline-view';
import Nav from './Shared/Nav';

function Home() {
  return (
    <div className="App">
      <h1>Media analytics site</h1>
    </div>
  );
}

function NotFound() {
  return (
    <div className="App">
      <h1>Not found</h1>
    </div>
  );
}

const links = [
  [
    { href: '/', text: 'Home' },
    { href: '/frequency', text: 'Frequency Over Time' },
    { href: '/sentiment', text: 'Sentiment Over Time' },
    { href: '/topic-modeling', text: 'Topic Modeling' },
    { href: '/latent-association', text: 'Latent Association' },
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
          <Route exact path="/" component={Home} />
          <Route path="/frequency" component={FrequencyTimeline} />
          <Route path="/sentiment" component={SentimentTimeline} />
          <Route component={NotFound} />
        </Switch>
      </Nav>
    </Router>
  );
}

import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Timeline from './Timeline/Timeline-view';
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

export default function App() {
  return (
    <Nav title="NYT Analytics">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/timeline" component={Timeline} />
          <Route component={NotFound} />
        </Switch>
      </Router>
    </Nav>
  );
}

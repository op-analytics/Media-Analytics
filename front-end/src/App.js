import React from 'react';
import './App.css';
import {BrowserRouter as Router, Route } from 'react-router-dom';

function Home() {
  return (
    <div className="App">
      <h1>Media analytics site</h1>
    </div>
  );
}
export default function App() {
  return (
    <Router>
      <Route exact path='/' component={Home}/>
    </Router>
  );
}

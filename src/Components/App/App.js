import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <Nav />
        <OpenReviews />
      </main>
    )
  }
}

export default App;
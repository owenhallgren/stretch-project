import React, { Component } from 'react';
import Nav from '../Nav/Nav'
import './App.css';

class App extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <main>
        <Nav />
      </main>
    )
  }
}

export default App;
import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import CurrentReviews from '../CurrentReviews/CurrentReviews'
import { mockReviews } from '../../mockUserData'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      openReviews: []
    }
  }

  componentDidMount = () => {
    this.setState( {openReviews: mockReviews} )
  }

  render() {
    return (
      <main>
        <Nav />
        {/* <OpenReviews openReviews={this.state.openReviews}/> */}
        <CurrentReviews/>
      </main>
    )
  }
}

export default App;
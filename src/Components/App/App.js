import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import CurrentReviews from '../CurrentReviews/CurrentReviews'
import './App.css';
import { mockReviews } from '../../mockUserData'
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      openReviews: [],
      filteredReviews: [],
      user: 'Jackson'
    }
  }

  componentDidMount = () => {
    this.setState( {openReviews: mockReviews} )
  }

  addReview = (id) => {
    const updatedReviews = this.state.openReviews.map(review => {
      if(review.id === parseInt(id)) {
        review.reviewer = this.state.user
      }
      return review  
    })
    this.setState({openReviews: updatedReviews})
  }
  


  render() {
    return (
      <main>
        <Nav />
        <Route exact path='/' render={() => 
          <OpenReviews openReviews={this.state.openReviews} filteredReviews={this.state.filteredReviews}
           addReview={this.addReview}/>
        }/>
        <Route exact path='/dashboard' render={() => 
                <CurrentReviews state={this.state}/>
        }/>

      </main>
    )
  }
}

export default App;
import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import CurrentReviews from '../CurrentReviews/CurrentReviews'
import './App.css';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      openReviews: [],
      filteredReviews: [],
      user: 'Jackson',
      noFilteredReviews: false
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3001/reviews')
      .then((response) => response.json())
      .then((mockReviews) => this.setState( {openReviews: mockReviews} ))
      .catch((error) => console.log(error))
  }

  addReview = (e) => {
    fetch(`http://localhost:3001/reviews/accept/${e.target.id}/${this.state.user}`, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((reviews) => this.setState({ openReviews: reviews }))
      .catch((error) => console.log(error))
  }
  
sortByLanguage = (language) => {
  const filteredReviews = this.state.openReviews.filter(review => review.language === language && !review.reviewer)

  if(filteredReviews.length){
    this.setState({ filteredReviews: filteredReviews, noFilteredReviews: false })
  } else {
    this.setState({ noFilteredReviews: true })
  }
}

finishReview = (e) => {
  fetch(`http://localhost:3001/reviews/complete/${e.target.id}`, {
    method: 'PUT'
  })
    .then((response) => response.json())
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => console.log(error))
}

undoReview = (e) => {
  fetch(`http://localhost:3001/reviews/undo/${e.target.id}`, {
    method: 'PUT'
  })
    .then((response) => response.json())
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => console.log(error))
}


cancelReview = (e) => {
  fetch(`http://localhost:3001/reviews/cancel/${e.target.id}`, {
    method: 'PUT'
  })
    .then((response) => response.json())
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => console.log(error))
}
  render() {
    return (
      <main>
        <Nav />
        <Route exact path='/' render={() => 
          <OpenReviews
            noFilteredReviews={this.state.noFilteredReviews}
            sortByLanguage={this.sortByLanguage} 
            openReviews={this.state.openReviews} 
            filteredReviews={this.state.filteredReviews}
            addReview={this.addReview}/>
          }/>
        <Route exact path='/dashboard' render={() => 
                <CurrentReviews state={this.state} finishReview={this.finishReview} undoReview={this.undoReview} cancelReview={this.cancelReview}/>
        }/>

      </main>
    )
  }
}

export default App;
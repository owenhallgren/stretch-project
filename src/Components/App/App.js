import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import CurrentReviews from '../CurrentReviews/CurrentReviews'
import NewReviewForm from '../NewReviewForm/NewReviewForm'
import './App.css';
import { Route } from 'react-router-dom';


class App extends Component {
  constructor() {
    super();
    this.state = {
      openReviews: [],
      filteredReviews: [],
      user: 'Jackson',
      noFilteredReviews: false,
      email: 'jacksonmichael@gmail.com',
      username: 'jacksonmcguire'
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
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((reviews) => this.setState({ openReviews: reviews }))
      .catch((error) => console.log(error))
  }
  
sortByLanguage = (language) => {
  const filteredReviews = this.state.openReviews.filter(review => review.language === language && !review.reviewer)
  console.log(language)
  if(!language) {
    this.setState({ filteredReviews: []})
  } else if(filteredReviews.length){
    this.setState({ filteredReviews: filteredReviews, noFilteredReviews: false })
  } else if(language !== ''){
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


submitNewReview = (partialRequest) => {
  const newRequest= {...partialRequest, username: this.state.username, email: this.state.email, 
    status: '', reviewer: '', id: Date.now()}
  //add fetch request here and reassign fetch resonse to open reviews below (and get rid of id above)
  console.log([newRequest, ...this.state.openReviews])
  this.setState({ openReviews: [newRequest, ...this.state.openReviews]})

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
        <Route exact path='/new' render={() => 
                <NewReviewForm submitNewReview={this.submitNewReview}/>
        }/>
      </main>
    )
  }
}

export default App;
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
      username: 'jacksonmcguire',
      filterValue: ''
    }
  }

  componentDidMount = () => {
    fetch('http://localhost:3003/api/v1/reviews')
      .then((response) => response.json())
      .then((mockReviews) => this.setState( {openReviews: mockReviews} ))
      .catch((error) => console.log(error))
  }

  addReview = (e) => {
    fetch(`http://localhost:3003/api/v1/reviews/accept/${e.target.id}/${this.state.user}`, {
      method: 'PUT',
    })
      .then((response) => response.json())
      .then((reviews) => this.setState({ openReviews: reviews, filteredReviews: [], filterValue: ''}))
      .catch((error) => console.log(error))
  }
  

  sortByLanguage = (language) => {
    const fReviews = this.state.openReviews.filter(review => review.language === language && !review.reviewer)
    console.log(language)
    if(!language) {
      this.setState({ filteredReviews: [], noFilteredReviews: false, filterValue: language})//fix applied here
    } else if(fReviews.length){
      this.setState({ filteredReviews: fReviews, noFilteredReviews: false, filterValue: language})
    } else if(language !== ''){
      this.setState({ noFilteredReviews: true, filterValue: language })
    } else {
      console.log("and that's a miss")//remove once done testing
    }
  }

  finishReview = (e) => {
    fetch(`http://localhost:3003/api/v1/reviews/complete/${e.target.id}`, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((reviews) => this.setState({ openReviews: reviews }))
      .catch((error) => console.log(error))
  }

  undoReview = (e) => {
    fetch(`http://localhost:3003/api/v1/reviews/undo/${e.target.id}`, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((reviews) => this.setState({ openReviews: reviews }))
      .catch((error) => console.log(error))
  }


  cancelReview = (e) => {
    fetch(`http://localhost:3003/api/v1/reviews/cancel/${e.target.id}`, {
      method: 'PUT'
    })
      .then((response) => response.json())
      .then((reviews) => this.setState({ openReviews: reviews }))
      .catch((error) => console.log(error))
  }


  submitNewReview = (partialRequest) => {
    const newRequest = {...partialRequest, username: this.state.username, email: this.state.email, 
      status: '', reviewer: ''}
      fetch(`http://localhost:3003/api/v1/reviews`, {
      method: 'POST',headers: {
          "Content-Type": "application/json"
        },
      body: JSON.stringify({
        date: newRequest.date,
        email: newRequest.email,
        language: newRequest.language, 
        repo: newRequest.repo,
        reviewer: newRequest.reviewer,
        status: newRequest.status,
        summary: newRequest.summary, 
        username: newRequest.username
      })
    })

      .then((response) => response.json())
      .then((review) => this.setState({ openReviews:[review[0], ...this.state.openReviews] }))
      .catch((error) => console.log(error))
  }

  deleteReview = (e) => {
    console.log('deleted', e.target.id)//delete once working

    fetch(`http://localhost:3003/api/v1/reviews/${e.target.id}`, {
      method: 'DELETE'
    })
    .then((response) => response.json())
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => console.log(error))

  }



resetFilteredReviews = () => {
  this.setState({ filteredReviews: []})
}


  render() {
    return (
      <main>
        <Nav resetFilteredReviews={this.resetFilteredReviews}/>
        <Route exact path='/' render={() => 
          <OpenReviews
            noFilteredReviews={this.state.noFilteredReviews}
            sortByLanguage={this.sortByLanguage} 
            openReviews={this.state.openReviews} 
            filteredReviews={this.state.filteredReviews}
            addReview={this.addReview}
            filterValue={this.state.filterValue}
          />
        }/>
        <Route exact path='/dashboard' render={() => 
          <CurrentReviews 
          state={this.state} 
          finishReview={this.finishReview} 
          undoReview={this.undoReview} 
          cancelReview={this.cancelReview}
          deleteReview={this.deleteReview}
          />
        }/>
        <Route exact path='/new' render={() => 
          <NewReviewForm submitNewReview={this.submitNewReview}/>
        }/>
      </main>
    )
  }
}

export default App;
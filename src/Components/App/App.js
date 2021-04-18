import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import CurrentReviews from '../CurrentReviews/CurrentReviews'
import NewReviewForm from '../NewReviewForm/NewReviewForm'
import './App.css';
import { Route } from 'react-router-dom';
import { getAllReviews, updateExistingData, postNewReview } from "../api.js"


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
      filterValue: '',
      error: ''
    }
  }

  componentDidMount = () => {
    getAllReviews()
    .then((mockReviews) => this.setState( {openReviews: mockReviews} ))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  addReview = (e) => {
    updateExistingData(`accept/${e.target.id}/${this.state.user}`, 'PUT')
    .then((reviews) => this.setState({ openReviews: reviews, filteredReviews: [], filterValue: ''}))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  finishReview = (e) => {
    updateExistingData(`complete/${e.target.id}`, 'PUT')
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  undoReview = (e) => {
    updateExistingData(`undo/${e.target.id}`, 'PUT')
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  cancelReview = (e) => {
    updateExistingData(`cancel/${e.target.id}`, 'PUT')
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  deleteReview = (e) => {
    updateExistingData(`${e.target.id}`, 'DELETE')
    .then((reviews) => this.setState({ openReviews: reviews }))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  submitNewReview = (partialRequest) => {
    const newRequest = {...partialRequest, username: this.state.username, email: this.state.email, 
      status: '', reviewer: ''}

    postNewReview(newRequest)
    .then((review) => this.setState({ openReviews:[review[0], ...this.state.openReviews] }))
    .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))
  }

  sortByLanguage = (language) => {
    const fReviews = this.state.openReviews.filter(review => review.language === language && !review.reviewer)

    if(!language) {
      this.setState({ filteredReviews: [], noFilteredReviews: false, filterValue: language})
    } else if(fReviews.length){
      this.setState({ filteredReviews: fReviews, noFilteredReviews: false, filterValue: language})
    } else if(language !== ''){
      this.setState({ noFilteredReviews: true, filterValue: language })
    } else {
      this.setState({error: 'An error has occured. Please try again later.'})
    }
  }

resetFilteredReviews = () => {
  this.setState({ filteredReviews: [], filterValue: ''})
}


  render() {
    return (
      <main>
        <Nav error={this.state.error} resetFilteredReviews={this.resetFilteredReviews}/>
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
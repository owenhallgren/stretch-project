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
    .then((mockReviews) => this.resetOpenReviews(mockReviews))
    .catch((error) => this.setErrorMessage())
  }

  addReview = (e) => {
    updateExistingData(`accept/${e.target.id}/${this.state.user}`, 'PUT')
    .then((reviews) => this.setState({ openReviews: reviews, filteredReviews: [], filterValue: ''}))
    .catch((error) => this.setErrorMessage())
  }

  finishReview = (e) => {
    updateExistingData(`complete/${e.target.id}`, 'PUT')
    .then((reviews) => this.resetOpenReviews(reviews))
    .catch((error) => this.setErrorMessage())
  }

  undoReview = (e) => {
    updateExistingData(`undo/${e.target.id}`, 'PUT')
    .then((reviews) => this.resetOpenReviews(reviews))
    .catch((error) => this.setErrorMessage())
  }

  cancelReview = (e) => {
    updateExistingData(`cancel/${e.target.id}`, 'PUT')
    .then((reviews) => this.resetOpenReviews(reviews))
    .catch((error) => this.setErrorMessage())
  }

  deleteReview = (e) => {
    updateExistingData(`${e.target.id}`, 'DELETE')
    .then((reviews) => this.resetOpenReviews(reviews))
    .catch((error) => this.setErrorMessage())
  }

  submitNewReview = (partialRequest) => {
    const newRequest = {...partialRequest, username: this.state.username, email: this.state.email, 
      status: '', reviewer: ''}

    postNewReview(newRequest)
    .then((review) => this.resetOpenReviews([review[0], ...this.state.openReviews]))
    .catch((error) => this.setErrorMessage())
  }

  setErrorMessage = () => {
    this.setState({error: 'An error has occured. Please try again later.'})
  }

  resetOpenReviews = (reviews) => {
    this.setState({ openReviews: reviews })
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

sendEmail = (type, e) => {
   e.preventDefault();
   let review = this.state.openReviews.find(review => review.id === parseInt(e.target.id));
   fetch('http://localhost:3003/api/v1/email', {
     method: 'POST',
     headers: {
         "Content-Type": "application/json"
       },
     body: JSON.stringify({
       email: review.email,
       type: type,
       reviewerEmail: this.state.email,
       username: this.state.username,
       user: review.username
     })
   })
   .then(response => response.json())
   .catch((error) => this.setState({error: 'An error has occured. Please try again later.'}))   
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
            sendEmail={this.sendEmail}
          />
        }/>
        <Route exact path='/dashboard' render={() => 
          <CurrentReviews 
          state={this.state} 
          finishReview={this.finishReview} 
          undoReview={this.undoReview} 
          cancelReview={this.cancelReview}
          deleteReview={this.deleteReview}
          sendEmail={this.sendEmail}
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
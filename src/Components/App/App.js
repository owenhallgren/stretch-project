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

  addReview = (id) => {
    const updatedReviews = this.state.openReviews.map(review => {
      if(review.id === parseInt(id)) {
        review.reviewer = this.state.user
        review.status = 'active'
      }
      return review  
    })
    this.setState({openReviews: updatedReviews})
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
  const completedReview = this.state.openReviews.map(review => {
    if(review.id === parseInt(e.target.id)) {
      review.status = 'complete'
    }
    return review
  })
  this.setState({ openReviews: completedReview })
}

undoReview = (e) => {
  const undoReview = this.state.openReviews.map(review => {
    if(review.id === parseInt(e.target.id)) {
      review.status = 'active'
    }
    return review
  })
  this.setState({ openReviews: undoReview })
}


cancelReview = (e) => {
  const cancelledReview = this.state.openReviews.map(review => {
    if(review.id === parseInt(e.target.id)) {
      review.status = ''
      review.reviewer = ''
    }
    return review
  })
  this.setState({ openReviews: cancelledReview })
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
import React, { Component } from 'react';
import Nav from '../Nav/Nav';
import OpenReviews from '../OpenReviews/OpenReviews'
import CurrentReviews from '../CurrentReviews/CurrentReviews'
import './App.css';
import { mockReviews } from '../../mockUserData'

class App extends Component {
  constructor() {
    super();
    this.state = {
      openReviews: [],
      user: 'Jackson'
    }
  }

  componentDidMount = () => {
    this.setState( {openReviews: mockReviews} )
  }

  addReview = (id) => {
    const updatedReviews = this.state.openReviews.map(review => {
      console.log(`review id ${review.id}`)
      console.log(id)
      if(review.id === parseInt(id)) {
        review.reviewer = this.state.user
      }
      return review  
    })

    console.log(updatedReviews)
    this.setState({openReviews: updatedReviews})
    console.log(this.state.openReviews)
  }
  


  render() {
    return (
      <main>
        <Nav />
        <OpenReviews openReviews={this.state.openReviews} addReview={this.addReview}/>
        {/* <CurrentReviews state={this.state}/> */}
      </main>
    )
  }
}

export default App;
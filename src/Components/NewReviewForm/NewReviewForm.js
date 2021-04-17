import React, { Component } from 'react'
import './NewReviewForm.css'

class NewReviewForm extends Component {
  constructor() {
    super()

    this.state = {
      summary: '',
      language: '',
      repo: '',
      displayMessage: ''
    }

  }

  // clearInputs = () => {
  //   this.setState({ summary: '', language: '', repo: '' })
  // }

  handleChange = (data, dataCategory) => {
    this.setState({ [dataCategory]: data })
  }

  submitReview = (event) => {
    event.preventDefault(event)
    if(!this.state.summary || !this.state.language || !this.state.repo) {
      this.setState({displayMessage: 'Please fill in all fields'})//exits submission as a field is blank
      // ^^update this with DOM alert to user to fill in field
    } else {

      const newReview = {summary: this.state.summary, language: this.state.language, repo: this.state.repo, date: this.getDate()}
      this.setState({displayMessage: 'Request submitted successfully!', summary: '', language: '', repo: ''})

      this.props.submitNewReview(newReview)
    }




  }

  getDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(dd < 10) {
        dd='0'+dd;
    } 
    if(mm < 10) {
        mm='0'+mm;
    } 

    return mm+'/'+dd+'/'+yyyy;
  }

  render () {

    return(
      <section className="new-review-page">
        <h2>Submit a new request</h2>
        <form className="new-review-form">
          <select value={this.state.language} onChange={(event) => this.handleChange(event.target.value, 'language')}>
            <option value="" defaultValue>Choose a language</option>
            <option value="C">C</option>
            <option value="C++">C++</option>
            <option value="C#">C#</option>
            <option value="Python">Python</option>
            <option value="Ruby">Ruby</option>
            <option value="Java">Java</option>
            <option value="JavaScript">JavaScript</option>
            <option value="PHP">PHP</option>
            <option value="Other">Other</option>
          </select>
          <input value={this.state.repo} type="text" placeholder="Repository URL" onChange={(event) => this.handleChange(event.target.value, 'repo')}></input>
          <textarea className="summary-input" value={this.state.summary} type="text" placeholder="Summary of Request" onChange={(event) => this.handleChange(event.target.value, 'summary')}></textarea>
          <button onClick={(event) => this.submitReview(event)}>Submit</button>
        </form>
        {this.state.displayMessage && <p>{this.state.displayMessage}</p>}
      </section>
    )
  }
}

export default NewReviewForm;
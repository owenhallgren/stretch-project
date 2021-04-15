import React, { Component } from 'react'

class NewReviewForm extends Component {
  constructor() {
    super()

    this.state = {
      summary: '',
      language: '',
      repo: ''
      //users email and GH will be passed down. date added dynamically
    }

  }

  clearInputs = () => {
    this.setState({ summary: '', language: '', repo: '' })
  }

  handleChange = (data, dataCategory) => {
    this.setState({ [dataCategory]: data })
  }

  submitReview = (event) => {
    event.preventDefault(event)
    if(!this.state.summary || !this.state.language || !this.state.repo) {
      return alert('too much sauce')//exits submission as a field is blank
      // ^^update this with DOM alert to user to fill in field
    }

    const newReview = {...this.state, date: this.getDate()}
    this.props.submitNewReview(newReview)
    //send in method passed in from App
    this.clearInputs()
  }

//pass in missing data from app
//pass down method from app


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
      <>
      <form className="new-review">
        <select value={this.state.language} onChange={(event) => this.handleChange(event.target.value, 'language')}>
          <option value="" defaultValue></option>
          <option value="C">C</option>
          <option value="C+">C+</option>
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
        <input value={this.state.summary} type="text" placeholder="Summary of Request" onChange={(event) => this.handleChange(event.target.value, 'summary')}></input>
        <button onClick={(event) => this.submitReview(event)}>Submit</button>

      </form>
      </>
    )
  }
}

export default NewReviewForm;
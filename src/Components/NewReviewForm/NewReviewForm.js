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




  render () {

    return(
      <>
      <form>
        <select onChange={(event) => this.handleChange(event.target.value, 'language')}>
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
        <input type="text" placeholder="Repository URL" onChange={(event) => this.handleChange(event.target.value, 'repo')}></input>
        <input type="text" placeholder="Summary of Request" onChange={(event) => this.handleChange(event.target.value, 'summary')}></input>


      </form>
      </>
    )
  }
}

export default NewReviewForm;
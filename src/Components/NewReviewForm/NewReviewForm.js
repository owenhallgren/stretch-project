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


  render () {

    return(
      <>
      <form>
        <select>
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
        <input></input>
        <input></input>


      </form>


      </>
    )
  }
}


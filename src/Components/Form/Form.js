import React, { Component } from 'react'
import './Form.css'

class Form extends Component {
  constructor() {
    super()

    this.state = {
      input: ''
    }

  }


  render() {

    return (
      <form>
        <label htmlFor="languageFilter">Sort by: </label>
        <select id="languageFilter">
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
        <select>
          <option></option>
          <option></option>
        </select>
      </form>
    )
  }
}

export default Form
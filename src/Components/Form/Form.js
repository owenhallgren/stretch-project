import React from 'react'
import './Form.css'

const Form = ({filterValue, sortByLanguage}) => {

    return (
      <form>
        <label htmlFor="languageFilter">Sort by: </label>
        <select value={filterValue} onChange={(e) => sortByLanguage(e.target.value)} id="languageFilter">
          <option value=""></option>
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
      </form>
    )
  }


export default Form
import React, { Component } from 'react';
import './Login.css'

class Login extends Component {
  constructor() {
    super()
    this.state = {
      username: ''
    }
  }

  handleChange = (input) => {
    this.setState({username: input})
  }

  render() {
    return (
    <form>
      <input type="text" placeholder="username" id="name" onChange={(e) => this.handleChange(e.target.value)}/>
      <button onClick={(e) => this.props.setUsername(this.state.username, e)}>Submit</button>
    </form>
  )
  }
}


export default Login;
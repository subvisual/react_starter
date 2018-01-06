import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class About extends Component {
  render() {
    return (
      <div>
        This is About <Link to="/">Go to home</Link>
      </div>
    )
  }
}

export default About

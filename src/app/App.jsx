import React, { Component } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import marketing from '../marketing'

import './reset.css'

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/" component={marketing.pages} />
      </BrowserRouter>
    )
  }
}

export default App

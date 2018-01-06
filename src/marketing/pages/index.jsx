import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import Home from './Home'
import About from './About'

const Routes = () => (
  <Fragment>
    <Route path="/" component={Home} exact />
    <Route path="/about" component={About} />
  </Fragment>
)

export default Routes

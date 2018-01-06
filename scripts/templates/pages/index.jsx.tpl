import React, { Fragment } from 'react'
import { Route } from 'react-router-dom'

import PAGE_NAME from './PAGE_NAME'

const Routes = () => (
  <Fragment>
    <Route path="/" component={PAGE_NAME} exact />
  </Fragment>
)

export default Routes

import { createStore } from 'redux'

export default createStore(
  a => a,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

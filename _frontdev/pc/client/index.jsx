import {Router, Route, browserHistory} from 'react-router'
import {Provider} from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'
import routeConfig from './route'
import configure from './store'
const store = configure()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} routes={routeConfig}/>
  </Provider>,
  document.getElementById('root')
)

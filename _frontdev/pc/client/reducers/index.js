
import { routeReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import menu from './menu'
import navi from './navigationbar'

export default combineReducers({
  routing,
  menu,
  navi
})

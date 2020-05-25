// Imports
import { combineReducers } from 'redux'

// App Imports
import user from './user'
import {matches,match} from './match'

export default combineReducers({
  user,
  match,
  matches
})

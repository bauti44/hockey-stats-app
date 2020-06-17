// Imports
import { combineReducers } from 'redux'

// App Imports
import user from './user'
import {matches,match} from './match'
import {stats,stat} from './stat'
import {speech} from './speech'

export default combineReducers({
  user,
  match,
  matches,
  stat,
  stats,
  speech
})

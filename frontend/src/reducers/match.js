// Imports
import update from 'immutability-helper'

// App Imports
import { FETCH_MATCHES_BEGIN, SET_MATCHES, FETCH_MATCH_BEGIN, SET_MATCH } from '../actions/match'

export function matches(state = { list: [], error: false, loading: false }, action = {}) {
  console.log(action);
  switch (action.type) {
    
    case FETCH_MATCHES_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });

    case SET_MATCHES:
      return update(state, {
        $merge: {
          list: action.list,
          error: false,
          loading: false
        }
      });

    default:
      return state
  }
}

export function match(state = { details: {}, error: false, loading: false }, action = {}) {
  switch (action.type) {

    case FETCH_MATCH_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      })

    case SET_MATCH:
      return update(state, {
        $merge: {
          details: action.match,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}
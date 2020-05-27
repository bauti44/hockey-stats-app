// Imports
import update from 'immutability-helper'

// App Imports
import { FETCH_STATS_BEGIN, SET_STATS, FETCH_STAT_BEGIN, SET_STAT } from '../actions/stat'

export function stats(state = { list: [], error: false, loading: false }, action = {}) {
  switch (action.type) {
    
    case FETCH_STATS_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });

    case SET_STATS:
      return update(state, {
        $merge: {
          list: action.stats,
          error: false,
          loading: false
        }
      });

    default:
      return state
  }
}

export function stat(state = { details: {}, error: false, loading: false }, action = {}) {
  switch (action.type) {

    case FETCH_STAT_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      })

    case SET_STAT:
      return update(state, {
        $merge: {
          details: action.stat,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}
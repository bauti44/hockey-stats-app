// Imports
import update from 'immutability-helper'

// App Imports
import { FETCH_TEAMS_BEGIN, SET_TEAMS, FETCH_TEAM_BEGIN, SET_TEAM } from '../actions/team'

export function teams(state = { list: [], error: false, loading: false }, action = {}) {
  switch (action.type) {
    
    case FETCH_TEAMS_BEGIN:
      return update(state, {
        $merge: {
          list: [],
          error: false,
          loading: true
        }
      });

    case SET_TEAMS:
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

export function team(state = { details: {}, error: false, loading: false }, action = {}) {
  switch (action.type) {

    case FETCH_TEAM_BEGIN:
      return update(state, {
        $merge: {
          details: {},
          error: false,
          loading: true
        }
      })

    case SET_TEAM:
      return update(state, {
        $merge: {
          details: action.team,
          error: false,
          loading: false
        }
      })

    default:
      return state
  }
}
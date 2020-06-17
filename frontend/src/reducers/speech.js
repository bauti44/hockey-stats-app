// Imports
import update from 'immutability-helper'

// App Imports
import { NOTIFY_SPOTTED_KEYWORDS, BEGIN_SPOTTING_KEYWORDS } from '../actions/speech'

export function speech(state = { spottedKeywords: {}, error: false }, action = {}) {
  switch (action.type) {

    case BEGIN_SPOTTING_KEYWORDS:
      return update(state, {
        $merge: {
          spottedKeywords: {},
          error: false,
        }
      });

    case NOTIFY_SPOTTED_KEYWORDS:
      return update(state, {
        $merge: {
          spottedKeywords: action.spottedKeywords,
          error: false,
        }
      });

    default:
      return state
  }
}
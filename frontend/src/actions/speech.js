import config from "../config/index"

export const NOTIFY_SPOTTED_KEYWORDS = 'notify_spotted_keywords'
export const BEGIN_SPOTTING_KEYWORDS = 'begin_spotting_keywords'

export function fetchSpeechToken() {
  const token = localStorage.getItem('token')
  return dispatch => {
    return fetch(`${config.url.api}speech/token`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => response.json())
  }
}

export function beginSpottingKeywords() {
  return dispatch => {
    dispatch({
      type: BEGIN_SPOTTING_KEYWORDS,
    })
  }
}

export function notifySpottedKeywords(spottedKeywords) {
  return dispatch => {
    dispatch({
      type: NOTIFY_SPOTTED_KEYWORDS,
      spottedKeywords: spottedKeywords
    })
  }
}
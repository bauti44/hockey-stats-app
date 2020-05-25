import config from "../config/index"

export const FETCH_MATCHES_BEGIN = 'FETCH_MATCHES_BEGIN'
export const SET_MATCHES = 'SET_MATCHES'
export const FETCH_MATCH_BEGIN = 'FETCH_MATCH_BEGIN'
export const SET_MATCH = 'SET_MATCH'

export function fetchMatches() {
  const token = localStorage.getItem('token')
  return dispatch => {
    dispatch({
      type: FETCH_MATCHES_BEGIN
    })

    return fetch(`${config.url.api}matches`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          dispatch({
            type: SET_MATCHES,
            list: response.data
          })
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function createMatch(match) {
  const token = localStorage.getItem('token')

  return dispatch => {
    return fetch(`${config.url.api}match/create`, {
      method: 'post',

      body: JSON.stringify(match),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
    // .then(response => response.json())
  }
}
// App Imports
import config from '../config'
import {CONSTANTS} from '../helpers/Constants'

export const SET_STATS = 'SET_STATS'
export const FETCH_STATS_BEGIN = 'FETCH_STATS_BEGIN'
export const SET_STAT = 'SET_STAT'
export const FETCH_STAT_BEGIN = 'FETCH_STAT_BEGIN'

export function fetchStats (matchId) {
  const token = localStorage.getItem('token')
  return dispatch => {
    var uri;
    if(matchId === CONSTANTS.ALL_MATCHES) {
      uri = `${ config.url.api }stats`
    } else {
      uri = `${ config.url.api }stats?matchId=${ matchId }`
    }
    return fetch(uri, {
      method: 'get',

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => response.json())
  }
}

export function fetchStat (statId) {
  const token = localStorage.getItem('token')
  return dispatch => {
    dispatch({
      type: FETCH_STAT_BEGIN
    })

    return fetch(`${ config.url.api }stat/${ statId }`, {
      method: 'get',

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.success) {
            dispatch({
              type: SET_STAT,
              stat: response.data
            })
          }
        })
      } else {
        console.log('Looks like the response wasn\'t perfect, got status', response.status)
      }
    }, function (e) {
      console.log('Fetch failed!', e)
    })
  }
}

export function postStat (stat) {
  const token = localStorage.getItem('token')
  return dispatch => {
    return fetch(`${ config.url.api }stat/add`, {
      method: 'post',

      body: JSON.stringify(stat),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(response => response.json())
  }
}

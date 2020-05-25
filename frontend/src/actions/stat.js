// App Imports
import config from '../config'

export const SET_STATS = 'SET_STATS'
export const FETCH_STATS_BEGIN = 'FETCH_STATS_BEGIN'
export const SET_STAT = 'SET_STAT'
export const FETCH_STAT_BEGIN = 'FETCH_STAT_BEGIN'

export function fetchStats () {
  return dispatch => {
    dispatch({
      type: FETCH_STATS_BEGIN
    })

    return fetch(`${ config.url.api }stats`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          dispatch({
            type: SET_STATS,
            stats: response.data
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

export function fetchStat (statId) {
  return dispatch => {
    dispatch({
      type: FETCH_STAT_BEGIN
    })

    return fetch(`${ config.url.api }stat/${ statId }`).then(function (response) {
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

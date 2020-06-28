import config from "../config/index"

export const FETCH_TEAMS_BEGIN = 'FETCH_TEAMS_BEGIN'
export const SET_TEAMS = 'SET_TEAMS'
export const FETCH_TEAM_BEGIN = 'FETCH_TEAM_BEGIN'
export const SET_TEAM = 'SET_TEAM'

export function fetchTeams() {
  const token = localStorage.getItem('token')
  return dispatch => {
    dispatch({
      type: FETCH_TEAMS_BEGIN
    })

    return fetch(`${config.url.api}teams`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          dispatch({
            type: SET_TEAMS,
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

export function fetchTeam(teamId) {
  return dispatch => {
    dispatch({
      type: FETCH_TEAM_BEGIN
    })

    return fetch(`${config.url.api}teams/${teamId}`).then(function (response) {
      if (response.ok) {
        response.json().then(function (response) {
          if (response.success) {
            dispatch({
              type: SET_TEAM,
              team: response.data
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

export function removeTeam(teamId) {
  const token = localStorage.getItem('token')
  return dispatch => {
    return fetch(`${config.url.api}teams/${teamId}`, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    }).then(response => response.json())
  }
}

export function createTeam(team) {
  const token = localStorage.getItem('token')

  return dispatch => {
    return fetch(`${config.url.api}teams`, {
      method: 'post',

      body: JSON.stringify(team),

      headers: {
        'Content-Type': 'application/json',
        'x-access-token': token
      }
    })
      .then(response => response.json())
  }
}
import config from "../config/index"

export function createMatch (match) {
    const token = localStorage.getItem('token')
  
    return dispatch => {
      return fetch(`${ config.url.api }match/create`, {
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
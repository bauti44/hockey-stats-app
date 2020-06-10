import config from "../config/index"

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
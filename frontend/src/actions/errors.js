import config from "../config/index"

export function postError(error) {
    const token = localStorage.getItem('token')
    fetch(`${config.url.api}errors`, {
        method: 'post',
        body: JSON.stringify(error),
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
}
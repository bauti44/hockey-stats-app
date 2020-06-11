// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

let config = {
  url: {}
}

if (NODE_ENV === 'production') {
  config.url.api = 'https://hockeystats.com.ar:8443/api/v1/' // Change this URL according to your live server
} else {
  config.url.api = '/api/v1/'
}

export default config

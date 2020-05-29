// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

let config = {
  url: {}
}

if (NODE_ENV === 'production') {
  config.url.api = 'http://ec2-54-82-119-201.compute-1.amazonaws.com:8080/' // Change this URL according to your live server
} else {
  config.url.api = '/'
}

export default config

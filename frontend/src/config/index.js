// Configurations for Frontend
const NODE_ENV = (process.env.NODE_ENV === 'production') ? 'production' : 'development'

let config = {
  url: {}
}

if (NODE_ENV === 'production') {
  //config.url.api = 'http://ec2-54-198-146-118.compute-1.amazonaws.com/' // Change this URL according to your live server
  config.url.api = 'http://192.168.0.10:5001/'
} else {
  config.url.api = '/'
}

export default config

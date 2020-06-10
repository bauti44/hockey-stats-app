// src / config / index.js
'use strict'

const {
  MONGODB_HOSTNAME,
  ENCRYPTION_KEY,
  NODE_ENV,
  REGISTER_TOKEN,
  SPEECH_TO_TEXT_API_KEY
} = process.env;

const config = {
  portHttp: 8080,
  portHttps: 8443,
  secret: `${ENCRYPTION_KEY}`,
  databaseUrl:  `mongodb://${MONGODB_HOSTNAME}/hockeystats`,
  saltRounds: 10,
  nodeEnv: `${NODE_ENV}`,
  registerToken: `${REGISTER_TOKEN}`,
  speechToTextApiKey: `${SPEECH_TO_TEXT_API_KEY}`
}

module.exports = config

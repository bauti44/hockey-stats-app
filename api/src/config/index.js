// src / config / index.js
'use strict'

const {
  MONGODB_HOSTNAME,
  ENCRYPTION_KEY,
  NODE_ENV
} = process.env;

const config = {
  port: 5001,
  secret: `${ENCRYPTION_KEY}`,
  databaseUrl:  `mongodb://${MONGODB_HOSTNAME}/hockeystats`,
  saltRounds: 10
}

module.exports = config

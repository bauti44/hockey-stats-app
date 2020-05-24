// src / routes / health.js
'use strict'

// Imports
const express = require('express')

// Common Routes
let commonRoutes = express.Router()

const mongoose = require('mongoose')

// Health
commonRoutes.get('/health', (request, response) => {
  response.sendStatus(200)
})

// DB
commonRoutes.get('/db', (request, response) => {
  let readyState = mongoose.connection.readyState
  switch (readyState) {
    case 0:
      response.status(500).send("disconnected")
      break;
    case 1:
      response.status(200).send("connected")
      break;
    case 2:
      response.status(200).send("connecting")
      break;
    case 3:
      response.status(500).send("disconnecting")
      break;
  }
})

// Export
module.exports = commonRoutes
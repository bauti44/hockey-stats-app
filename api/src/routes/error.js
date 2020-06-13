// src / routes / match.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
const config = require('./../config')
let authMiddleware = require('./middlewares/auth')
let Error = require('../models/error')

// Common Routes
let errorRoutes = express.Router()

// Errors (/errors)
errorRoutes.get('/api/v1/errors', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }
  if (!isEmpty(request.user)) {
    Error.find({}).exec(function (error, documents) {
      if (documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to get errors.' })
    response.json(responseData)
  }
})

// Error Post (/errors)
errorRoutes.post('/api/v1/errors', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    let error = {
      stack: request.body.stack,
      userId: request.user._id,
      createdAt: new Date()
    }

    Error.create(error, (error, document) => {
      if (error) {
        responseData.errors.push({ type: 'critical', message: error })
      } else {
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create an error.' })
    response.json(responseData)
  }
})

// Export
module.exports = errorRoutes

// src / routes / stat.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
const config = require('./../config')
let authMiddleware = require('./middlewares/auth')
let Stat = require('../models/stat')

// Common Routes
let statRoutes = express.Router()

// Stats (/stats)
statRoutes.get('/stats', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }

  Stat.find({}).exec(function (error, documents) {
    if (documents.length > 0) {
      responseData.data = documents
      responseData.success = true
    }

    response.json(responseData)
  })
})

// Stat Add (/stat/add)
statRoutes.post('/stat/add', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    if (request.body.matchId != '' && request.body.result != '') {
      let stat = {
        matchId: request.body.matchId,
        areaEntryType: request.body.areaEntryType,
        areaEntryZone: request.body.areaEntryZone,
        definitionGesture: request.body.definitionGesture,
        definitionZone: request.body.definitionZone,
        result: request.body.result
      }

      Stat.create(stat, (error, document) => {
        if (error) {
          responseData.errors.push({type: 'critical', message: error})
        } else {
          let statId = document._id

          if (statId) {
            responseData.data.statId = statId
            responseData.success = true
          } else {
            responseData.errors.push({type: 'default', message: 'Please try again.'})
          }
        }

        response.json(responseData)
      })
    } else {
      responseData.errors.push({type: 'warning', message: 'Please enter a stat.'})

      response.json(responseData)
    }
  } else {
    responseData.errors.push({type: 'critical', message: 'You are not signed in. Please sign in to create a stat.'})

    response.json(responseData)
  }
})

// Single Stats (/stat/statId)
statRoutes.get('/stat/:statId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.params.statId) {
    Stat.find({_id: request.params.statId}).exec(function (error, documents) {
      if (documents && documents.length > 0) {
        responseData.data = documents[0]
        responseData.success = true
      }

      response.json(responseData)
    })
  } else {
    response.json(responseData)
  }
})

// Export
module.exports = statRoutes

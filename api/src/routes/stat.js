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
statRoutes.get('/api/v1/stats', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }

  if (!isEmpty(request.user)) {
    var filters = request.query;
    if (request.user.role != 'ADMIN') {
      filters["userId"] = request.user._id;
    }
    var count = request.query.count;
    var query = undefined;
    if (request.query.count) {
      delete filters['count'];
      query = Stat.countDocuments(filters);
    } else {
      query = Stat.find(filters);
    }
    query.exec(function (error, documents) {
      if (count || documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to list stats.' })
    response.json(responseData)
  }
})

// Stat Add (/stat/add)
statRoutes.post('/api/v1/stat/add', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    if (request.body.matchId != '' && request.body.result != '') {
      let stat = {
        matchId: request.body.matchId,
        quarter: request.body.quarter,
        statType: request.body.statType,
        statZoneType: request.body.statZoneType,
        statZoneValue: request.body.statZoneValue,
        player: request.body.player,
        userId: request.user._id,
        createdAt: new Date()
      }
      Stat.create(stat, (error, document) => {
        if (error) {
          responseData.errors.push({ type: 'critical', message: error })
        } else {
          let statId = document._id

          if (statId) {
            responseData.data.statId = statId
            responseData.success = true
          } else {
            responseData.errors.push({ type: 'default', message: 'Please try again.' })
          }
        }
        response.json(responseData)
      })
    } else {
      responseData.errors.push({ type: 'warning', message: 'Please enter a stat.' })
      response.json(responseData)
    }
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a stat.' })
    response.json(responseData)
  }
})

// Stat Add Batch (/stat/add/batch)
statRoutes.post('/api/v1/stat/add/batch', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user) && request.user.role === 'ADMIN') {
    var statList = []
    request.body.stats.forEach(statBody => {
      let stat = {
        matchId: statBody.matchId,
        quarter: statBody.quarter,
        statType: statBody.statType,
        statZoneType: statBody.statZoneType,
        statZoneValue: statBody.statZoneValue,
        player: statBody.player,
        userId: statBody.userId,
        createdAt: statBody.createdAt
      }
      statList.push(stat)
    })

    Stat.insertMany(statList, (error, document) => {
      if (error) {
        responseData.errors.push({ type: 'critical', message: error })
      } else {
        if (document.length > 0) {
          responseData.success = true
        } else {
          responseData.errors.push({ type: 'default', message: 'Please try again.' })
        }
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in as admin to create a batch.' })
    response.json(responseData)
  }
})

// Single Stats (/stat/statId)
statRoutes.get('/api/v1/stat/:statId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    if (request.params.statId) {
      Stat.find({ _id: request.params.statId }).exec(function (error, documents) {
        if (documents && documents.length > 0) {
          responseData.data = documents[0]
          responseData.success = true
        }
        response.json(responseData)
      })
    } else {
      response.json(responseData)
    }
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to get a stat.' })
    response.json(responseData)
  }
})

// Single Stat delete (/stat/statId)
statRoutes.delete('/api/v1/stat/:statId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    var filters = { _id: request.params.statId }
    if (request.user.role != 'ADMIN') {
      filters["userId"] = request.user._id;
    }
    Stat.deleteOne(filters).exec(function (error, document) {
      if (document.ok) {
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to delete a stat.' })
    response.json(responseData)
  }
})

// All Stat delete (/stat/) (DEV PURPOSES)
statRoutes.delete('/api/v1/stat/', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user) && request.user.role === 'ADMIN') {
    Stat.deleteMany({}).exec(function (error, document) {
      if (document) {
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to delete a stat.' })
    response.json(responseData)
  }
})


// Export
module.exports = statRoutes

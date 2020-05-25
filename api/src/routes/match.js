// src / routes / match.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
const config = require('./../config')
let authMiddleware = require('./middlewares/auth')
let Match = require('../models/match')

// Common Routes
let matchRoutes = express.Router()

// Matches (/matches)
matchRoutes.get('/matches', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }

  if (!isEmpty(request.user)) {
    var filters = {}
    if (request.user.role != 'ADMIN') {
      filters["userId"] = request.user._id;
    }
    Match.find(filters).sort('-createdAt').exec(function (error, documents) {
      if (documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }

      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a match.' })

    response.json(responseData)
  }
})

// Matches Players (/matches/players)
matchRoutes.get('/matches/players', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }

  if (!isEmpty(request.user)) {
    var filters = {}
    if (request.user.role != 'ADMIN') {
      filters["userId"] = request.user._id;
    }
    Match.find(filters, 'playerList').exec(function (error, documents) {
      console.log(documents)
      if (documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }

      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a match.' })

    response.json(responseData)
  }
})

// Match Add (/match/add)
matchRoutes.post('/match/add', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    if (request.body.teamHome != '' && request.body.teamAway != '') {
      let match = {
        teamHome: request.body.teamHome,
        teamAway: request.body.teamAway,
        category: request.body.category,
        gender: request.body.gender,
        notes: request.body.notes,
        playerList: request.body.playerList,
        userId: request.user._id,
        createdAt: new Date()
      }

      Match.create(match, (error, document) => {
        if (error) {
          responseData.errors.push({ type: 'critical', message: error })
        } else {
          let matchId = document._id

          if (matchId) {
            responseData.data.matchId = matchId
            responseData.success = true
          } else {
            responseData.errors.push({ type: 'default', message: 'Please try again.' })
          }
        }

        response.json(responseData)
      })
    } else {
      responseData.errors.push({ type: 'warning', message: 'Please enter match.' })

      response.json(responseData)
    }
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a match.' })

    response.json(responseData)
  }
})

// Single Match delete (/match/matchId)
matchRoutes.delete('/match/:matchId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    var filters = {_id: request.params.matchId}
    if (request.user.role != 'ADMIN') {
      filters["userId"] = request.user._id;
    }
    Match.deleteOne(filters).exec(function (error, document) {
      if (document.ok) {
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to delete a match.' })
    response.json(responseData)
  }
}),

// Single Matches (/match/matchId)
matchRoutes.get('/match/:matchId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (request.params.matchId) {
    Match.find({ _id: request.params.matchId }).exec(function (error, documents) {
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
module.exports = matchRoutes

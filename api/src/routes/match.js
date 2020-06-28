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
matchRoutes.get('/api/v1/matches', authMiddleware, (request, response) => {
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
    Match.find(filters)
      .populate('teamAway').populate('teamHome')
      .sort('-createdAt').exec(function (error, documents) {
        if (error) {
          responseData.errors.push(error)
        } else if (documents.length > 0) {
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
matchRoutes.get('/api/v1/matches/players', authMiddleware, (request, response) => {
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

// Match Add Batch (/matches/batch)
matchRoutes.post('/api/v1/matches/batch', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user) && request.user.role === 'ADMIN') {
    var matchList = []
    request.body.matches.forEach((matchBody) => {
      let match = {
        teamHome: matchBody.teamHome,
        teamAway: matchBody.teamAway,
        category: matchBody.category,
        gender: matchBody.gender,
        notes: matchBody.notes,
        playerList: matchBody.playerList,
        userId: matchBody.userId,
        createdAt: matchBody.createdAt,
      }
      matchList.push(match)
    })
    Match.insertMany(matchList, (error, document) => {
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
    });
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in as admin to create a batch.' })
    response.json(responseData)
  }
})

// Match Create (/matches)
matchRoutes.post('/api/v1/matches', authMiddleware, (request, response) => {
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

// Match Edit (/matches)
matchRoutes.patch('/api/v1/matches/:matchId', authMiddleware, async (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    let match = {
      teamHome: request.body.teamHome,
      teamAway: request.body.teamAway,
      category: request.body.category,
      gender: request.body.gender,
      notes: request.body.notes,
      playerList: request.body.playerList
    }
    const matchDocument = await Match.findOne({ _id: request.params.matchId })
    if (match.teamHome && match.teamHome != matchDocument.teamHome) {
      matchDocument.teamHome = match.teamHome
    }
    if (match.teamAway && match.teamAway != matchDocument.teamAway) {
      matchDocument.teamAway = match.teamAway
    }
    if (match.category && match.category != matchDocument.category) {
      matchDocument.category = match.category
    }
    if (match.gender && match.gender != matchDocument.gender) {
      matchDocument.gender = match.gender
    }
    if (match.notes && match.notes != matchDocument.notes) {
      matchDocument.notes = match.notes
    }
    if (match.playerList && match.playerList != matchDocument.playerList) {
      matchDocument.playerList = match.playerList
    }
    matchDocument.save().then(document => {
      responseData.success = true
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a match.' })
    response.json(responseData)
  }
})

// Single Match delete (/matches/matchId)
matchRoutes.delete('/api/v1/matches/:matchId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    var filters = { _id: request.params.matchId }
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

  // Single Matches (/matches/matchId)
  matchRoutes.get('/api/v1/matches/:matchId', authMiddleware, (request, response) => {
    let responseData = {
      success: false,
      data: {},
      errors: []
    }

    if (request.params.matchId) {
      Match.find({ _id: request.params.matchId })
      .populate('teamAway').populate('teamHome')
      .exec(function (error, documents) {
        if (error) {
          responseData.errors.push(error)
        } else if (documents && documents.length > 0) {
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

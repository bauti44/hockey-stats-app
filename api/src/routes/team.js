// src / routes / team.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')

// App Imports
const config = require('./../config')
let authMiddleware = require('./middlewares/auth')
let Team = require('../models/team')

// Common Routes
let teamRoutes = express.Router()

// Teams (/teams)
teamRoutes.get('/api/v1/teams', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: [],
    errors: []
  }

  if (!isEmpty(request.user)) {
    var filters = {}
    Team.find(filters).exec(function (error, documents) {
      if (documents.length > 0) {
        responseData.data = documents
        responseData.success = true
      }

      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a team.' })

    response.json(responseData)
  }
})

// Team Add Batch (/team/batch)
teamRoutes.post('/api/v1/teams/batch', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user) && request.user.role === 'ADMIN') {
    var teamList = []
    request.body.teams.forEach((teamBody) => {
      let team = {
        name: teamBody.name,
        badgeImage: teamBody.badgeImage,
        country: teamBody.country,
        externalId: teamBody.externalId
      }
      teamList.push(team)
    })

    Team.insertMany(teamList, (error, document) => {
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

// Team Add (/team)
teamRoutes.post('/api/v1/teams', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }

  if (!isEmpty(request.user)) {
    if (request.body.name != '') {
      let team = {
        name: request.body.name,
        badgeImage: request.body.badgeImage,
        country: request.body.country
      }

      Team.create(team, (error, document) => {
        if (error) {
          responseData.errors.push({ type: 'critical', message: error })
        } else {
          let teamId = document._id

          if (teamId) {
            responseData.data.teamId = teamId
            responseData.success = true
          } else {
            responseData.errors.push({ type: 'default', message: 'Please try again.' })
          }
        }

        response.json(responseData)
      })
    } else {
      responseData.errors.push({ type: 'warning', message: 'Please enter team name.' })

      response.json(responseData)
    }
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to create a team.' })

    response.json(responseData)
  }
})

// Single Team delete (/team/teamId)
teamRoutes.delete('/api/v1/teams/:teamId', authMiddleware, (request, response) => {
  let responseData = {
    success: false,
    data: {},
    errors: []
  }
  if (!isEmpty(request.user)) {
    var filters = { _id: request.params.teamId }
    if (request.user.role != 'ADMIN') {
      filters["userId"] = request.user._id;
    }
    Team.deleteOne(filters).exec(function (error, document) {
      if (document.ok) {
        responseData.success = true
      }
      response.json(responseData)
    })
  } else {
    responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to delete a team.' })
    response.json(responseData)
  }
}),

  // Single Teams (/team/teamId)
  teamRoutes.get('/api/v1/teams/:teamId', authMiddleware, (request, response) => {
    let responseData = {
      success: false,
      data: {},
      errors: []
    }

    if (request.params.teamId) {
      Team.find({ _id: request.params.teamId }).exec(function (error, documents) {
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
module.exports = teamRoutes

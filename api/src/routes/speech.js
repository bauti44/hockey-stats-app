// src / routes / speech.js
'use strict'

// Imports
const express = require('express')
const isEmpty = require('lodash/isEmpty')
const { IamTokenManager } = require('ibm-watson/auth');


// App Imports
const config = require('./../config')
let authMiddleware = require('./middlewares/auth')

// Common Routes
let speechRoutes = express.Router()

const tokenManager = new IamTokenManager({
    apikey: config.speechToTextApiKey,
});

// Speech Token (/speech/token)
speechRoutes.get('/api/v1/speech/token', authMiddleware, async (request, response) => {
    let responseData = {
        success: false,
        data: {},
        errors: []
    }

    if (!isEmpty(request.user)) {
        //todo get tockens from env
        let accessToken = await tokenManager.getToken();
        let serviceUrl = "https://api.us-south.speech-to-text.watson.cloud.ibm.com/instances/dfa4efe0-2fd1-408e-8698-8af4fde8ab71"
        responseData.success = true
        responseData.data = {
            accessToken,
            serviceUrl
        }
        response.json(responseData)
    } else {
        responseData.errors.push({ type: 'critical', message: 'You are not signed in. Please sign in to get speech auth.' })
        response.json(responseData)
    }
})

// Export
module.exports = speechRoutes

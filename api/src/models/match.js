// src / models / match.js
'use strict'

const mongoose = require('mongoose')

// Match Collection
let MatchSchema = mongoose.Schema({
  teamHome: String,
  teamAway: String,
  category: String,
  gender: String,
  createdAt: Date
})

let Match = mongoose.model('matches', MatchSchema)

module.exports = Match

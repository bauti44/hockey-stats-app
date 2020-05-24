// src / models / stat.js
'use strict'

const mongoose = require('mongoose')

// Stat Collection
let StatSchema = mongoose.Schema({
  matchId: String,
  areaEntryType: String,
  areaEntryZone: String,
  definitionGesture: String,
  definitionZone: String,
  result: String
})

let Stat = mongoose.model('stats', StatSchema)

module.exports = Stat

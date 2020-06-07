// src / models / match.js
'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);


// Match Collection
let MatchSchema = mongoose.Schema({
  teamHome: String,
  teamAway: String,
  category: String,
  gender: String,
  notes: String,
  playerList: Array,
  userId: String,
  createdAt: Date,
  externalId: Number
})

MatchSchema.plugin(AutoIncrement, {id:'match_external_id_seq',inc_field: 'externalId'});

let Match = mongoose.model('matches', MatchSchema)

module.exports = Match

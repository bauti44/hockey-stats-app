// src / models / team.js
'use strict'

const mongoose = require('mongoose')
const AutoIncrement = require('mongoose-sequence')(mongoose);

// Team Collection
let TeamSchema = mongoose.Schema({
  name: String,
  badgeImage: String,
  country: String,
  externalId: Number
})

TeamSchema.plugin(AutoIncrement, {id:'team_external_id_seq',inc_field: 'externalId'});

let Team = mongoose.model('teams', TeamSchema)

module.exports = Team

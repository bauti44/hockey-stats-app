// src / models / error.js
'use strict'

const mongoose = require('mongoose')

// User Collection
let ErrorSchema = mongoose.Schema({
  stack: String,
  userId: String,
  createdAt: Date
})

let Error = mongoose.model('errors', ErrorSchema)

module.exports = Error

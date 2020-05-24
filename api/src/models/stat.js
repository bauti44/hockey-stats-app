// src / models / stat.js
'use strict'

const mongoose = require('mongoose')

// Stat Collection
let StatSchema = mongoose.Schema({
  matchId: String,
  /*
    Non-mandatory
    Values: 
      q1: First quarter
      q2: Second quarter
      q3: Third quarter
      q4: Forth quarter
  */
  quarter: String,
  /*
    Non-mandatory
    Values: 
      st: Salida
      bl: Bloqueo
      lost: Perdida
      rec: Recuperacion
      eyrd: Entrada 25 yardas
      earea: Entrada area
      sht: Tiro al arco
      pc: Penalty corner
      g: Gol
      ps: Penalty stroke
  */
  statType: String,
  /*
    Non-mandatory
    Values: 
      field: Campo
      area: Area
  */
  statZoneType: String,
  /*
    Non-mandatory
    Values: 
      field: 
        10  11  12
        7   8   9
        4   5   6
        1   2   3
      area: 
        _   er      | yr
          ar \      |
        a0  ac | ec | yc
        _ al  /     |
            el      | yl
  */
  statZoneValue: String,
  /*
    Non-mandatory
    Values: 
      Any uppercase string
  */
  player: String,
})

let Stat = mongoose.model('stats', StatSchema)

module.exports = Stat

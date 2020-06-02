import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchStats } from '../../../actions/stat'
import { connect } from 'react-redux'

import { Chart } from 'chart.js';
import CONSTANTS from '../../../helpers/Constants';

const statTypeList =
{
  'st': 'Salida',
  'bl': 'Bloqueo',
  'lost': 'Perdida',
  'rec': 'Recupero',
  'eyrd': 'Ingreso 25',
  'earea': 'Ingreso area',
  'sht': 'Tiro al arco',
  'pc': 'Corner corto',
  'g': 'Gol',
  'ps': 'Penal'
}

class StatTypeGraphView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allPlayers: this.props.player === CONSTANTS.EMPTY_PLAYERS,
      rivalPlayers: this.props.player === CONSTANTS.RIVAL
    }
  }

  componentDidMount() {
    this.props.fetchStats(this.props.matchId).then(response => {
      var updatedMap = {}
      Object.keys(statTypeList).forEach(key => {
        var playerQty = response.data.filter(item => {
          return item.player === this.props.player && item.statType === key
        }).length

        var teamQty = response.data.filter(item => {
          return item.statType === key
        }).length

        updatedMap[statTypeList[key]] = {
          player: playerQty,
          team: teamQty
        }
      })

      var graphDatasets = []
      if (this.state.rivalPlayers) {
        graphDatasets.push({
          label: "RIVAL",
          data: Object.values(updatedMap).map(item => item.player),
          backgroundColor: '#ffc1b9', // array should have same number of elements as number of dataset
          borderWidth: 0
        })
      } else {
        graphDatasets.push({
          label: 'EQUIPO',
          data: Object.values(updatedMap).map(item => item.team),
          backgroundColor: 'rgb(161, 196, 201, 0.5)', // array should have same number of elements as number of dataset
          borderWidth: 0
        })

        if(!this.state.allPlayers) {
          graphDatasets.push({
            label: this.props.player,
            data: Object.values(updatedMap).map(item => item.player),
            backgroundColor: 'rgb(19, 79, 92, 0.5)', // array should have same number of elements as number of dataset
            borderWidth: 0
          })
        }
      }

      this.bars = new Chart("barChart", {
        type: 'bar',
        data: {
          labels: Object.keys(updatedMap),
          datasets: graphDatasets
        },
        options: {
          scales: {
            xAxes: [{
              stacked: true
            }],
            yAxes: [{
              ticks: {
                beginAtZero: true,
                userCallback: function (label, index, labels) {
                  // when the floored value is the same as the value we have a whole number
                  if (Math.floor(label) === label) {
                    return label;
                  }
                },
              }
            }]
          }
        }
      })
    })
  }

  render() {
    return (
      <canvas id="barChart" ref={this.barChart}></canvas>
    );
  }
}

StatTypeGraphView.propTypes = {
  fetchStats: PropTypes.func.isRequired,
  player: PropTypes.string.isRequired,
  matchId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    statList: state.stats.list,
  }
}

export default connect(mapStateToProps, { fetchStats })(StatTypeGraphView);
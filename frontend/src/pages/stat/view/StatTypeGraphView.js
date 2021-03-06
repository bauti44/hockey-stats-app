import React, { Component } from 'react'
import PropTypes from 'prop-types';

import { Chart } from 'chart.js';
import {CONSTANTS, STAT_MAP} from '../../../helpers/Constants';
import { IonGrid, IonRow, IonCol, IonLabel, IonSlides, IonSlide } from '@ionic/react';
import ZoneView from './ZoneView';

class StatTypeGraphView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      allPlayers: this.props.player === CONSTANTS.EMPTY_PLAYERS,
      rivalPlayers: this.props.player === CONSTANTS.RIVAL,
      updatedMap: {}
    }
  }

  componentDidMount() {
    var updatedMap = {}
    Object.keys(STAT_MAP).forEach(key => {
      var playerQty = this.props.matchStatList.filter(item => {
        return item.player === this.props.player && item.statType === key
      }).length

      var teamQty = this.props.matchStatList.filter(item => {
        return item.statType === key && item.player !== CONSTANTS.RIVAL
      }).length

      updatedMap[STAT_MAP[key]] = {
        player: playerQty,
        team: teamQty
      }
    })

    this.setState({ updatedMap: updatedMap })

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

      if (!this.state.allPlayers) {
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
  }

  render() {
    return (
      <IonSlides pager>
        <IonSlide id="statGridViewSlider">
          <IonGrid class="statsGrid">
            <IonRow key="header">
              <IonCol class="headerCol" size="6">
                <IonLabel>ACCIÓN</IonLabel>
              </IonCol>
              {!this.state.allPlayers ?
                <IonCol class="statGridCol headerCol">
                  <IonLabel>{this.props.player}</IonLabel>
                </IonCol>
                : <></>}
              <IonCol class="statGridCol headerCol">
                <IonLabel>EQUIPO</IonLabel>
              </IonCol>
            </IonRow>
            {Object.keys(this.state.updatedMap).map((key) => (
              <IonRow key={key}>
                <IonCol size="6">
                  <IonLabel>{key}</IonLabel>
                </IonCol>
                {!this.state.allPlayers ?
                  <IonCol class="statGridCol">
                    <IonLabel>{this.state.updatedMap[key].player}</IonLabel>
                  </IonCol>
                  : <></>}
                <IonCol class="statGridCol">
                  <IonLabel>{this.state.updatedMap[key].team}</IonLabel>
                </IonCol>
              </IonRow>
            ))}
          </IonGrid>
        </IonSlide>
        <IonSlide id="graphViewSlider">
          <canvas id="barChart" ref={this.barChart}></canvas>
        </IonSlide>
        <IonSlide id="zoneViewSlider">
          <ZoneView {...this.props} />
        </IonSlide>
      </IonSlides>
    );
  }
}

StatTypeGraphView.propTypes = {
  matchStatList: PropTypes.array.isRequired,
  player: PropTypes.string.isRequired,
  statType: PropTypes.string.isRequired,
  statZoneType: PropTypes.string.isRequired,
}

StatTypeGraphView.defaultProps = {
  statType: '',
  player: CONSTANTS.EMPTY_PLAYERS
}

export default StatTypeGraphView;
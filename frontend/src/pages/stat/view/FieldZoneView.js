import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { fetchStats } from '../../../actions/stat'
import { connect } from 'react-redux'

import {
  IonGrid, IonRow, IonCol, IonLabel,
} from '@ionic/react';

class FieldZoneView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statsZoneMap: {
        '10': 0, '11': 0, '12': 0,
        '7': 0, '8': 0, '9': 0,
        '4': 0, '5': 0, '6': 0,
        '1': 0, '2': 0, '3': 0,
      }
    }
  }

  componentDidMount() {
    this.props.fetchStats(this.props.matchId).then(response => {
      var updatedStatsZoneMap = this.state.statsZoneMap
      Object.keys(this.state.statsZoneMap).forEach(key => {
        updatedStatsZoneMap[key] = response.data.filter(item => {
          return item.statZoneValue == key && item.statType == this.props.statType
        }).length
      })
      this.setState({ statsZoneMap: updatedStatsZoneMap })
    })
  }

  render() {
    return (
      <>
        <IonGrid class="field" fixed={true} >
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.state.statsZoneMap['10']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.state.statsZoneMap['11']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.state.statsZoneMap['12']}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.state.statsZoneMap['7']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.state.statsZoneMap['8']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.state.statsZoneMap['9']}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.state.statsZoneMap['4']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.state.statsZoneMap['5']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.state.statsZoneMap['6']}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.state.statsZoneMap['1']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.state.statsZoneMap['2']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.state.statsZoneMap['3']}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

FieldZoneView.propTypes = {
  statType: PropTypes.string.isRequired,
  fetchStats: PropTypes.func.isRequired,
  matchId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    statList: state.stats.list,
  }
}

export default connect(mapStateToProps, { fetchStats })(FieldZoneView);
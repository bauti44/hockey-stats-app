import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { fetchStats } from '../../../actions/stat'
import { connect } from 'react-redux'

import {
  IonGrid, IonRow, IonCol, IonLabel
} from '@ionic/react';

class AreaZoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      statsZoneMap: {
        'er': 0, 'yr': 0,
        'ar': 0,
        'a0': 0, 'ac': 0, 'ec': 0, 'yc': 0,
        'al': 0,
        'el': 0, 'yl': 0,
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
        <IonGrid class="areaView" fixed={true} >
          <IonRow>
            <IonCol  ><IonLabel></IonLabel></IonCol>
            <IonCol offset="-1" ><IonLabel class="first">{this.state.statsZoneMap['er']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel class="first">{this.state.statsZoneMap['yr']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel>{this.state.statsZoneMap['ar']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol  ><IonLabel>{this.state.statsZoneMap['a0']}</IonLabel></IonCol>
            <IonCol offset="1"><IonLabel>{this.state.statsZoneMap['ac']}</IonLabel></IonCol>
            <IonCol ><IonLabel>{this.state.statsZoneMap['ec']}</IonLabel></IonCol>
            <IonCol ><IonLabel>{this.state.statsZoneMap['yc']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel>{this.state.statsZoneMap['al']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol offset="-1" ><IonLabel class="last">{this.state.statsZoneMap['el']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel class="last">{this.state.statsZoneMap['yl']}</IonLabel></IonCol>
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

AreaZoneView.propTypes = {
  statType: PropTypes.string.isRequired,
  fetchStats: PropTypes.func.isRequired,
  matchId: PropTypes.string.isRequired,
}

const mapStateToProps = (state) => {
  return {
    statList: state.stats.list,
  }
}

export default connect(mapStateToProps, { fetchStats })(AreaZoneView);
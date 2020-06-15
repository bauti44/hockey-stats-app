import React, { Component } from 'react'
import PropTypes from 'prop-types';
import FieldZoneView from './FieldZoneView';
import AreaZoneView from './AreaZoneView';
import CONSTANTS from '../../../helpers/Constants';
import { IonLabel, IonIcon, IonContent } from '@ionic/react';
import { options } from 'ionicons/icons';


class ZoneView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showFieldZone: false,
      showAreaZone: false,
      showFilterText: false,
      statsZoneMap: {
        // Area
        'ar': 0, 'er': 0, 'yr': 0,
        'ar': 0,
        'a0': 0, 'ac': 0, 'ec': 0, 'yc': 0,
        'al': 0,
        'al': 0, 'el': 0, 'yl': 0,
        // Field
        '10': 0, '11': 0, '12': 0,
        '7': 0, '8': 0, '9': 0,
        '4': 0, '5': 0, '6': 0,
        '1': 0, '2': 0, '3': 0,
      }
    }
  }

  componentDidMount() {
    var updatedStatsZoneMap = this.state.statsZoneMap
    Object.keys(this.state.statsZoneMap).forEach(key => {
      updatedStatsZoneMap[key] = this.props.matchStatList.filter(item => {
        var filterMatch = item.statZoneValue === key && item.statType === this.props.statType
        if (this.props.player) {
          filterMatch = filterMatch && item.player === this.props.player
        }
        return filterMatch;
      }).length
    })
    var showFilterText = !this.props.statZoneType
    this.setState({
      statsZoneMap: updatedStatsZoneMap,
      showFieldZone: this.props.statZoneType === CONSTANTS.FIELD,
      showAreaZone: this.props.statZoneType === CONSTANTS.AREA,
      showFilterText: showFilterText
    })
  }

  render() {
    return (
      <>
        {this.state.showFieldZone ?
          <FieldZoneView {...this.props} statsZoneMap={this.state.statsZoneMap} /> : <></>}
        {this.state.showAreaZone ?
          <AreaZoneView {...this.props} statsZoneMap={this.state.statsZoneMap} /> : <></>}
        {this.state.showFilterText ?
          <div class="filterTextLabel">
            <IonLabel>Filtrar por tipo de acción <IonIcon icon={options} /> para ver estadisticas por zona</IonLabel>
          </div>
          : <></>}
      </>
    );
  }
}

ZoneView.propTypes = {
  statZoneType: PropTypes.string.isRequired,
  statType: PropTypes.string.isRequired,
  matchStatList: PropTypes.array.isRequired,
  player: PropTypes.string,
}

export default ZoneView;
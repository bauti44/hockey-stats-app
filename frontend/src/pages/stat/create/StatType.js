import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonList,
  IonItem,
  IonLabel,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';
import {CONSTANTS} from '../../../helpers/Constants';

const statTypeList = [
  { name: 'Salida', value: 'st', zone: CONSTANTS.FIELD },
  { name: 'Bloqueo', value: 'bl', zone: CONSTANTS.FIELD },
  { name: 'Perdida', value: 'lost', zone: CONSTANTS.FIELD },
  { name: 'Recupero', value: 'rec', zone: CONSTANTS.FIELD },
  { name: 'Infracción', value: 'fault', zone: CONSTANTS.FIELD },
  { name: 'Ingreso 25', value: 'eyrd', zone: CONSTANTS.AREA },
  { name: 'Ingreso area', value: 'earea', zone: CONSTANTS.AREA },
  { name: 'Tiro al arco', value: 'sht', zone: CONSTANTS.AREA },
  { name: 'Corner corto', value: 'pc', zone: CONSTANTS.AREA },
  { name: 'Gol', value: 'g', zone: CONSTANTS.AREA },
  { name: 'Penal', value: 'ps', zone: CONSTANTS.AREA },
];

const quarterList = [
  { name: 'Q1', value: 'q1' },
  { name: 'Q2', value: 'q2' },
  { name: 'Q3', value: 'q3' },
  { name: 'Q4', value: 'q4' },
];

class StatType extends Component {
  render() {
    return (
      <>
        <IonSegment value={this.props.value} onIonChange={(e) => this.props.selectQuarter(e.target.value)}>
          {
            quarterList.map((quarterItem) => (
              <IonSegmentButton key={quarterItem.value} value={quarterItem.value}>
                <IonLabel>{quarterItem.name}</IonLabel>
              </IonSegmentButton>
            ))
          }
        </IonSegment>
        <IonList>
          {
            statTypeList.map((statTypeItem) => (
              <IonItem key={statTypeItem.name} color={statTypeItem.zone === CONSTANTS.AREA ? "itemColorLightBlue" : "itemColorBlue"} button
                onClick={this.props.selectType.bind(this, statTypeItem)}>
                <IonLabel>{statTypeItem.name.toUpperCase()}</IonLabel>
              </IonItem>
            ))
          }
        </IonList>
      </>
    );
  }
}

StatType.propTypes = {
  selectType: PropTypes.func.isRequired,
  selectQuarter: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired
}

StatType.defaultProps = {
  value: 'q1'
}

export default StatType;
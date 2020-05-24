import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonList,
  IonItem,
  IonLabel,
  IonIcon,
  IonSegment,
  IonSegmentButton,
} from '@ionic/react';

const statTypeList = [
  { name: 'Salida', zone: 'field' },
  { name: 'Bloqueo', zone: 'field' },
  { name: 'Perdida', zone: 'field' },
  { name: 'Recupero', zone: 'field' },
  { name: 'Ingreso 25', zone: 'area' },
  { name: 'Ingreso area', zone: 'area' },
  { name: 'Tiro al arco', zone: 'area' },
  { name: 'Corner corto', zone: 'area' },
  { name: 'Gol', zone: 'area' },
  { name: 'Penal', zone: 'area' },
];

const quarterList = [
  { name: 'Q1', value: 'q1' },
  { name: 'Q2', value: 'q2' },
  { name: 'Q3', value: 'q3' },
  { name: 'Q4', value: 'q4' },
];

class StatType extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <IonSegment onIonChange={(e) => this.props.selectQuarter(e.target.value)}>
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
              <IonItem key={statTypeItem.name} color={statTypeItem.zone == 'area' ? "lightBlue" : "salmon"} button
                onClick={this.props.selectType.bind(this, statTypeItem)}>
                <IonLabel>{statTypeItem.name.toUpperCase()}</IonLabel>
                <IonIcon slot="end" name="ios-arrow-forward" />
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
}

export default StatType;
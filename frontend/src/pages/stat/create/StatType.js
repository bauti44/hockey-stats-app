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
  { name: 'Salida', value: 'st', zone: 'field' },
  { name: 'Bloqueo', value: 'bl',zone: 'field' },
  { name: 'Perdida', value: 'lost',zone: 'field' },
  { name: 'Recupero', value: 'rec',zone: 'field' },
  { name: 'Ingreso 25', value: 'eyrd',zone: 'area' },
  { name: 'Ingreso area', value: 'earea',zone: 'area' },
  { name: 'Tiro al arco', value: 'sht',zone: 'area' },
  { name: 'Corner corto', value: 'pc',zone: 'area' },
  { name: 'Gol', value: 'g',zone: 'area' },
  { name: 'Penal', value: 'ps',zone: 'area' },
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
              <IonItem key={statTypeItem.name} color={statTypeItem.zone == 'area' ? "lightBlue" : "salmon"} button
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
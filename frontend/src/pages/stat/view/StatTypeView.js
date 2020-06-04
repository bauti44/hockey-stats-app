import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import CONSTANTS from '../../../helpers/Constants';

const statTypeList = [
  { name: 'Salida', value: 'st', zone: 'field' },
  { name: 'Bloqueo', value: 'bl',zone: 'field' },
  { name: 'Perdida', value: 'lost',zone: 'field' },
  { name: 'Recupero', value: 'rec',zone: 'field' },
  { name: 'Infracción', value: 'fault',zone: 'field' },
  { name: 'Ingreso 25', value: 'eyrd',zone: 'area' },
  { name: 'Ingreso area', value: 'earea',zone: 'area' },
  { name: 'Tiro al arco', value: 'sht',zone: 'area' },
  { name: 'Corner corto', value: 'pc',zone: 'area' },
  { name: 'Gol', value: 'g',zone: 'area' },
  { name: 'Penal', value: 'ps',zone: 'area' },
];

class StatType extends Component {

  render() {
    return (
      <>
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
}

export default StatType;
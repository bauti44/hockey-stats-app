import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';
import {CONSTANTS} from '../../../helpers/Constants';

const statTypeList = [
  { name: 'Salida', value: 'st', zone: CONSTANTS.FIELD },
  { name: 'Bloqueo', value: 'bl',zone: CONSTANTS.FIELD },
  { name: 'Perdida', value: 'lost',zone: CONSTANTS.FIELD },
  { name: 'Recupero', value: 'rec',zone: CONSTANTS.FIELD },
  { name: 'Infracción', value: 'fault',zone: CONSTANTS.FIELD },
  { name: 'Ingreso 25', value: 'eyrd',zone: CONSTANTS.AREA },
  { name: 'Ingreso area', value: 'earea',zone: CONSTANTS.AREA },
  { name: 'Tiro al arco', value: 'sht',zone: CONSTANTS.AREA },
  { name: 'Corner corto', value: 'pc',zone: CONSTANTS.AREA },
  { name: 'Gol', value: 'g',zone: CONSTANTS.AREA },
  { name: 'Penal', value: 'ps',zone: CONSTANTS.AREA },
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
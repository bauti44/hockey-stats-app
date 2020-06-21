import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol, IonLabel
} from '@ionic/react';

class AreaZoneView extends Component {
  // TODO Backward compatibility with eX

  render() {
    return (
      <>
        <IonGrid class="areaView" fixed={true} >
          <IonRow>
            <IonCol />
            <IonCol />
            <IonCol />
            <IonCol ><IonLabel class="topAlign">{this.props.statsZoneMap['yr']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel class="topAlign">{this.props.statsZoneMap['ar'] + (this.props.statsZoneMap['er'] || 0)}</IonLabel></IonCol>
            <IonCol />
            <IonCol />
            <IonCol />
          </IonRow>
          <IonRow>
            <IonCol  ><IonLabel>{this.props.statsZoneMap['a0']}</IonLabel></IonCol>
            <IonCol offset="1"><IonLabel>{this.props.statsZoneMap['ac'] + (this.props.statsZoneMap['ec'] || 0)}</IonLabel></IonCol>
            <IonCol />
            <IonCol ><IonLabel>{this.props.statsZoneMap['yc']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel class="bottomAlign">{this.props.statsZoneMap['al'] + (this.props.statsZoneMap['el'] || 0)}</IonLabel></IonCol>
            <IonCol />
            <IonCol />
            <IonCol />
          </IonRow>
          <IonRow>
            <IonCol />
            <IonCol />
            <IonCol />
            <IonCol ><IonLabel class="bottomAlign">{this.props.statsZoneMap['yl']}</IonLabel></IonCol>
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

AreaZoneView.propTypes = {
  statType: PropTypes.string.isRequired,
  statsZoneMap: PropTypes.object.isRequired,
}

export default AreaZoneView;
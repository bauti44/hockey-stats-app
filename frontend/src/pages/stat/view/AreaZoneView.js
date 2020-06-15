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
            <IonCol  ><IonLabel></IonLabel></IonCol>
            <IonCol offset="-1" ><IonLabel class="first"></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel class="first">{this.props.statsZoneMap['yr']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel>{this.props.statsZoneMap['ar'] + (this.props.statsZoneMap['er'] || 0)}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol  ><IonLabel>{this.props.statsZoneMap['a0']}</IonLabel></IonCol>
            <IonCol offset="1"><IonLabel>{this.props.statsZoneMap['ac']  + (this.props.statsZoneMap['ec'] || 0)}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel>{this.props.statsZoneMap['yc']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel>{this.props.statsZoneMap['al']  + (this.props.statsZoneMap['el'] || 0)}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol offset="-1" ><IonLabel class="last"></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel class="last">{this.props.statsZoneMap['yl']}</IonLabel></IonCol>
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
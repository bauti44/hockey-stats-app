import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol, IonLabel,
} from '@ionic/react';

class FieldZoneView extends Component {
  render() {
    return (
      <>
        <IonGrid class="field" fixed={true} >
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsZoneMap['10']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsZoneMap['11']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsZoneMap['12']}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsZoneMap['7']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsZoneMap['8']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsZoneMap['9']}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsZoneMap['4']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsZoneMap['5']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsZoneMap['6']}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsZoneMap['1']}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsZoneMap['2']}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsZoneMap['3']}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

FieldZoneView.propTypes = {
  statsZoneMap: PropTypes.object.isRequired,
}

export default FieldZoneView;
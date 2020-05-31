import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol, IonLabel
} from '@ionic/react';

class AreaZoneView extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <IonGrid class="areaView" fixed={true} >
          <IonRow>
            <IonCol  ><IonLabel></IonLabel></IonCol>
            <IonCol offset="-1" ><IonLabel class="first">{this.props.statsZoneMap['er']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel class="first">{this.props.statsZoneMap['yr']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel>{this.props.statsZoneMap['ar']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol  ><IonLabel>{this.props.statsZoneMap['a0']}</IonLabel></IonCol>
            <IonCol offset="1"><IonLabel>{this.props.statsZoneMap['ac']}</IonLabel></IonCol>
            <IonCol ><IonLabel>{this.props.statsZoneMap['ec']}</IonLabel></IonCol>
            <IonCol ><IonLabel>{this.props.statsZoneMap['yc']}</IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol offset="1" ><IonLabel>{this.props.statsZoneMap['al']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
          </IonRow>
          <IonRow>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol offset="-1" ><IonLabel class="last">{this.props.statsZoneMap['el']}</IonLabel></IonCol>
            <IonCol ><IonLabel></IonLabel></IonCol>
            <IonCol ><IonLabel class="last">{this.props.statsZoneMap['yl']}</IonLabel></IonCol>
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

AreaZoneView.propTypes = {
  statsZoneMap: PropTypes.object.isRequired,
}

export default AreaZoneView;
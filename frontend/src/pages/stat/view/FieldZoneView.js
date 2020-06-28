import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol, IonLabel,
} from '@ionic/react';

class FieldZoneView extends Component {

  constructor(props) {
    super(props)
    var values = Object.values(this.props.statsZoneMap)
    var min = Math.min(...values)
    var max = Math.max(...values)
    var delta = (max - min) / 3
    this.thresholdLow = min + delta
    this.thresholdMed = max - delta
  }

  getHeat(zone) {
    var value = this.getValue(zone)
    if (value > this.thresholdMed) {
      return 'high'
    } else if (value > this.thresholdLow) {
      return 'med'
    } else {
      return 'low'
    }
  }

  getValue(zone) {
    return this.props.statsZoneMap[zone.toString()]
  }

  render() {
    return (
      <>
        <IonGrid class="field" fixed={true} >
          {[
            { 'left': 10, 'center': 11, 'right': 12 },
            { 'left': 7, 'center': 8, 'right': 9 },
            { 'left': 4, 'center': 5, 'right': 6 },
            { 'left': 1, 'center': 2, 'right': 3 }
          ].map(item =>
            <IonRow>
              <IonCol class={"left " + this.getHeat(item['left'])}>
                <IonLabel>{this.getValue(item['left'])}</IonLabel>
              </IonCol>
              <IonCol class={"center " + this.getHeat(item['center'])}>
              <IonLabel>{this.getValue(item['center'])}</IonLabel>
              </IonCol>
              <IonCol class={"right " + this.getHeat(item['right'])}>
              <IonLabel>{this.getValue(item['right'])}</IonLabel>
              </IonCol>
            </IonRow>
          )}
        </IonGrid>
      </>
    );
  }
}

FieldZoneView.propTypes = {
  statsZoneMap: PropTypes.object.isRequired,
}

export default FieldZoneView;
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol,
} from '@ionic/react';

class GoalZone extends Component {

  render() {
    return (
      <>
        <IonGrid class="goal" fixed={false} >
          <IonRow>
            <IonCol class="left" onClick={this.props.selectSubZone.bind(this, 'lt')} />
            <IonCol class="center" onClick={this.props.selectSubZone.bind(this, 'ct')} />
            <IonCol class="right" onClick={this.props.selectSubZone.bind(this, 'rt')} />
          </IonRow>
          <IonRow>
            <IonCol class="left" onClick={this.props.selectSubZone.bind(this, 'lb')} />
            <IonCol class="center" onClick={this.props.selectSubZone.bind(this, 'cb')} />
            <IonCol class="right" onClick={this.props.selectSubZone.bind(this, 'rb')} />
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

GoalZone.propTypes = {
  selectSubZone: PropTypes.func.isRequired,
}

export default GoalZone;
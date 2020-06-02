import React, { Component } from 'react'
import PropTypes from 'prop-types';
import CONSTANTS from '../../../helpers/Constants'

import {
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';

class StatPlayer extends Component {

  render() {
    return (
      <IonList>
        <IonItem key="all" button color="itemColorLightBlue" onClick={this.props.selectPlayer.bind(this, CONSTANTS.EMPTY_PLAYER)}>
          <IonLabel>TODAS</IonLabel>
        </IonItem>
        <IonItem key="rival" button color="salmon" onClick={this.props.selectPlayer.bind(this, CONSTANTS.RIVAL)}>
          <IonLabel>RIVAL</IonLabel>
        </IonItem>
        {
          this.props.playerList.map((player) => (
            <IonItem key={player} button onClick={this.props.selectPlayer.bind(this, player)}>
              <IonLabel>{player.toUpperCase()}</IonLabel>
            </IonItem>
          ))
        }
      </IonList>
    );
  }
}

StatPlayer.propTypes = {
  playerList: PropTypes.array.isRequired,
  selectPlayer: PropTypes.func.isRequired
}

export default StatPlayer;
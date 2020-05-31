import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonList,
  IonItem,
  IonLabel,
} from '@ionic/react';

class StatPlayer extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IonList>
        <IonItem key="no-player" button color="itemColorLightBlue" onClick={this.props.selectPlayer.bind(this, "")}>
          <IonLabel>SALTEAR</IonLabel>
        </IonItem>
        <IonItem key="rival-player" button color="salmon" onClick={this.props.selectPlayer.bind(this, "RIVAL")}>
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
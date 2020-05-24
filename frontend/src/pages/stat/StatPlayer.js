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
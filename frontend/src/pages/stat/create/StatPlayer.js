import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {CONSTANTS} from '../../../helpers/Constants'

import {
  IonItem,
  IonLabel,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';

class StatPlayer extends Component {

  renderGrid() {
    var tempColList = this.props.playerList.map((player) => (
      <IonCol>
        <IonItem key={player} button detail={false} onClick={this.props.selectPlayer.bind(this, player)}>
          <IonLabel class="playerSelectLaberl">{player.toUpperCase()}</IonLabel>
        </IonItem>
      </IonCol>
    ))
    var gridList = []
    for (let index = 0; index < tempColList.length;) {
      if (index < (tempColList.length - 1))
        gridList.push(<IonRow>{tempColList[index]}{tempColList[index + 1]}</IonRow>)
      else
        gridList.push(<IonRow>{tempColList[index]}<IonCol /></IonRow>)
      index += 2
    }
    return gridList;
  }

  render() {
    return (
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonItem key="no-player" button color="itemColorLightBlue" onClick={this.props.selectPlayer.bind(this, CONSTANTS.EMPTY_PLAYERS)}>
              <IonLabel class="playerSelectLaberl">OMITIR</IonLabel>
            </IonItem>
          </IonCol>
          <IonCol>
            <IonItem key="rival-player" button color="salmon" onClick={this.props.selectPlayer.bind(this, CONSTANTS.RIVAL)}>
              <IonLabel class="playerSelectLaberl">RIVAL</IonLabel>
            </IonItem>
          </IonCol>
        </IonRow>
        {
          this.renderGrid()
        }
      </IonGrid >
    );
  }
}

StatPlayer.propTypes = {
  playerList: PropTypes.array.isRequired,
  selectPlayer: PropTypes.func.isRequired
}

export default StatPlayer;
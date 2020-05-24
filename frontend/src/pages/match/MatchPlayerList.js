import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonList,
  IonItem,
  IonLabel,
  IonFab,
  IonFabButton,
  IonIcon,
  IonInput,
  IonButton,
  IonFabList,
} from '@ionic/react';

class MatchPlayerList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerList: this.props.playerList,
      newPlayerName: '',
      showNewPlayer: false,
    }
  }

  addPlayer() {
    if (this.state.newPlayerName == '') {
      return;
    }
    var playerListTemp = [...this.state.playerList];
    playerListTemp.push(this.state.newPlayerName.toUpperCase())
    this.setState({ playerList: playerListTemp, newPlayerName: '' })
  }

  removePlayer(player) {
    var playerListTemp = [...this.state.playerList];
    var index = playerListTemp.indexOf(player)
    if (index !== -1) {
      playerListTemp.splice(index, 1);
      this.setState({ playerList: playerListTemp });
    }
  }

  importPlayers() {
    var playerListTemp = [...this.state.playerList];
    playerListTemp.push("Mayra", "Luchi", "Depli", "Mica", "Vichi", "Ine", "Rochi", "Vene", "Fiore", "Lulu", "Martu", "Abru")
    this.setState({ playerList: playerListTemp, newPlayerName: '' })
  }

  render() {
    return (
      <>
        <IonList>
          {
            this.state.playerList.map((player) => (
              <IonItem key={player} button >
                <IonLabel>{player.toUpperCase()}</IonLabel>
                <IonIcon name="trash" value={player} onClick={(e) => this.removePlayer(e.target.value)} />
              </IonItem>
            ))
          }
          <IonItem key="new-player">
            <IonInput value={this.state.newPlayerName} onIonChange={(e) => this.setState({ newPlayerName: e.target.value })} placeholder="NUEVA JUGADORA"></IonInput>
            <IonIcon name="person-add" spot="end" onClick={this.addPlayer.bind(this)} />
          </IonItem>
        </IonList>
        <IonButton color="lightBlue" size="medium" onClick={this.props.onSave.bind(this, this.state.playerList)} expand="block" >Guardar</IonButton>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="fabButtonAdd" name="ion-fab-button">
            <IonIcon name="add" onClick={() => this.setState({ showNewPlayer: true })} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={this.importPlayers.bind(this)}><IonIcon name="save"/></IonFabButton>
          </IonFabList>
        </IonFab>
      </>
    );
  }
}

MatchPlayerList.propTypes = {
  playerList: PropTypes.array,
  onSave: PropTypes.func.isRequired,
}

MatchPlayerList.defaultProps = {
  playerList: []
}

export default MatchPlayerList;
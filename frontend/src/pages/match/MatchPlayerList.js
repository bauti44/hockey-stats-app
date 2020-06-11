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
  IonButtons,
} from '@ionic/react';
import { connect } from 'react-redux';
import { fetchMatchesPlayers } from '../../actions/match'
import CONSTANTS from '../../helpers/Constants';
import { trash, personAdd, add, save } from 'ionicons/icons';

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
    if (this.state.newPlayerName === CONSTANTS.EMPTY_PLAYERS) {
      return;
    }
    setTimeout(() => {
      var playerListTemp = [...this.state.playerList];
      playerListTemp.push(this.state.newPlayerName.toUpperCase())
      this.setState({ playerList: playerListTemp, newPlayerName: CONSTANTS.EMPTY_PLAYERS })
    }, CONSTANTS.TIMEOUT);
  }

  removePlayer(player) {
    setTimeout(() => {
      var playerListTemp = [...this.state.playerList];
      var index = playerListTemp.indexOf(player)
      if (index !== -1) {
        playerListTemp.splice(index, 1);
        this.setState({ playerList: playerListTemp });
      }
    }, CONSTANTS.TIMEOUT);
  }

  importPlayers() {


    this.props.fetchMatchesPlayers().then(response => {
      if (response.success) {
        let playerAgreggatedList = []
        if (response.data.length > 0) {
          response.data.forEach(matchPlayersItem => {
            playerAgreggatedList.push(...matchPlayersItem.playerList)
          });
          this.setState({ playerList: Array.from(new Set(playerAgreggatedList)), newPlayerName: CONSTANTS.EMPTY_PLAYERS })
        }
      }
    })
  }

  render() {
    return (
      <>
        <IonList>
          {
            this.state.playerList.map((player) => (
              <IonItem key={player} >
                <IonLabel>{player.toUpperCase()}</IonLabel>
                <IonButtons>
                  <IonButton shape="round" slot="icon-only" value={player} onClick={(e) => this.removePlayer(e.target.value)}>
                    <IonIcon icon={trash} />
                  </IonButton>
                </IonButtons>
              </IonItem>
            ))
          }
          <IonItem key="new-player">
            <IonInput value={this.state.newPlayerName} onIonChange={(e) => this.setState({ newPlayerName: e.target.value })} placeholder="NUEVA JUGADORA"></IonInput>
            <IonButtons>
              <IonButton shape="round" slot="icon-only" onClick={this.addPlayer.bind(this)}>
                <IonIcon icon={personAdd} spot="end" />
              </IonButton>
            </IonButtons>
          </IonItem>
        </IonList>
        <IonButton color="lightBlue" size="medium" onClick={this.props.onSave.bind(this, this.state.playerList)} expand="block" >Guardar</IonButton>
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="fabButtonAdd" name="ion-fab-button">
            <IonIcon icon={add} onClick={() => this.setState({ showNewPlayer: true })} />
          </IonFabButton>
          <IonFabList side="top">
            <IonFabButton onClick={this.importPlayers.bind(this)}><IonIcon class="white" icon={save} /></IonFabButton>
          </IonFabList>
        </IonFab>
      </>
    );
  }
}

MatchPlayerList.propTypes = {
  playerList: PropTypes.array,
  onSave: PropTypes.func.isRequired,
  fetchMatchesPlayers: PropTypes.func.isRequired
}

MatchPlayerList.defaultProps = {
  playerList: []
}

export default connect(null, { fetchMatchesPlayers })(MatchPlayerList)
import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { createMatch } from '../../actions/match'
import { connect } from 'react-redux'
import MatchPlayerList from './MatchPlayerList';

import {
  IonButton, IonLoading, IonToast, IonListHeader, IonList, IonItem, IonInput, IonLabel,
} from '@ionic/react';

class MatchCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      playerList: [],
      teamHome: '',
      teamAway: '',
      renderMatchDetails: true,
      renderPlayerList: false,
      renderPlayerFromAllMatchesList: false,
      showLoading: false,
      showToast: false,
    }
    this.onSavePlayers = this.onSavePlayers.bind(this)
  }

  onSavePlayers(savedPlayerList) {
    this.resetRender()
    this.setState({ renderMatchDetails: true, playerList: savedPlayerList})
  }

  resetRender() {
    this.setState({
      renderMatchDetails: false,
      renderPlayerList: false,
      renderPlayerFromAllMatchesList: false,
      showLoading: false,
      showToast: false,
    })
  }

  componentDidMount() {
    global.backFunction = () => {
      if(this.state.renderMatchDetails) {
        global.defaultBackFunction()
      } else {
        this.resetRender()
        this.setState({ renderMatchDetails: true })
      }
    }
  }

  showPlayerList() {
    this.resetRender()
    this.setState({ renderPlayerList: true })
  }

  onSave() {
    this.props.createMatch({}).then((response) => {
      console.log("hola")
      if (response.success) {
      } else {
      }
      this.props.history.push('/match/list')
    });
  }

  render() {
    return (
      <>
        {this.state.renderMatchDetails ?
          <>
            <IonList>
              <IonItem>
                <IonLabel position="floating">Equipo Local</IonLabel>
                <IonInput value={this.state.teamHome} onIonChange={(e) => this.setState({teamHome: e.target.value.toUpperCase()})}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Equipo Visitante</IonLabel>
                <IonInput value={this.state.teamAway} onIonChange={(e) => this.setState({teamAway: e.target.value.toUpperCase()})}></IonInput>
              </IonItem>
            </IonList>

            <IonButton color="lightBlue" size="medium" onClick={this.showPlayerList.bind(this)} width="100%" expand="block">Jugadoras</IonButton>

            <IonButton color="darkBlue" size="medium" onClick={this.onSave.bind(this)} expand="block" >Crear</IonButton>

            <IonLoading isOpen={this.state.showLoading} message={'Por favor espere...'} />
            <IonToast color="success" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message="La estadística se creo exitosamente" duration={2000} />
          </>
          : <></>}
        {this.state.renderPlayerList ? <MatchPlayerList onSave={this.onSavePlayers} playerList={this.state.playerList} /> : <> </>}
        {this.state.renderPlayerFromAllMatchesList ? <MatchPlayerList selectPlayer={this.selectPlayer} playerList={this.state.playerList} /> : <> </>}
      </>
    );
  }
}

MatchCreate.propTypes = {
  createMatch: PropTypes.func.isRequired,
  playerFromAllMatchesList: PropTypes.array.isRequired,
}

const mapStateToProps = (state) => {
  return {
    playerFromAllMatchesList: ["Luchi", "Delpi", "Mica", "Ines", "Belu", "Rochi", "Vichi", "Abru", "Lulu", "Francia", "Martu"]
  };
}

export default connect(mapStateToProps, { createMatch })(MatchCreate)
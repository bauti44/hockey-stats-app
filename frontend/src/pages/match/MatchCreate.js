import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { createMatch } from '../../actions/match'
import { connect } from 'react-redux'
import MatchPlayerList from './MatchPlayerList';

import {
  IonButton, IonLoading, IonToast, IonList, IonItem, IonInput, IonLabel, IonSelect, IonSelectOption,
} from '@ionic/react';
import AuthRedirect from '../user/AuthRedirect';
import URL_REPO from '../../helpers/UrlRepo';
import CONSTANTS from '../../helpers/Constants';
import { actionStack, ACTION_NAME } from '../../actionStack/ActionStack';

class MatchCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      teamHome: '',
      teamAway: '',
      category: '',
      gender: 'f',
      notes: '',
      playerList: [],
      renderMatchDetails: true,
      renderPlayerList: false,
      showLoading: false,
      showToast: false,
      error: ''
    }
    this.onSavePlayers = this.onSavePlayers.bind(this)
    this.onSave = this.onSave.bind(this)

    this.props.history.listen((location) => {
      this.resetRender()
      switch (location.hash) {
        case '#matchPlayers':
          this.setState({ renderPlayerList: true })
          break;
        case '#matchDetails':
        default:
          this.setState({ renderMatchDetails: true })
      }
    })
  }

  onSavePlayers(savedPlayerList) {
    this.setState({playerList: savedPlayerList })
    this.props.history.push('#matchDetails')
    actionStack.push(ACTION_NAME.SAVE_PLAYERS_CLICK)
  }

  resetRender() {
    this.setState({
      renderMatchDetails: false,
      renderPlayerList: false,
      showLoading: false,
      showToast: false,
    })
  }

  showPlayerList() {
    this.props.history.push('#matchPlayers')
    actionStack.push(ACTION_NAME.SHOW_PLAYERS_LIST_CLICK)
  }

  onSave() {
    actionStack.push(ACTION_NAME.CREATE_MATCH_SAVE)
    this.setState({ isLoading: true })

    let match = {
      teamHome: this.state.teamHome.toUpperCase(),
      teamAway: this.state.teamAway.toUpperCase(),
      category: this.state.category.toUpperCase(),
      gender: this.state.gender.toUpperCase(),
      notes: this.state.notes.toUpperCase(),
      playerList: this.state.playerList
    }

    this.props.createMatch(match).then((response) => {
      if (response.success) {
        this.setState({ isLoading: false })
        this.props.history.push(`${URL_REPO.MATCH_LIST}?${CONSTANTS.SHOW_SUCCESS_FLAG}`)
      } else {
        this.setState({ isLoading: false, showToast: true, error: response.errors[0].message })
      }
    })
  }

  render() {
    return (
      <>
        {this.state.renderMatchDetails ?
          <>
            <IonList>
              <IonItem>
                <IonLabel position="floating">Equipo Local</IonLabel>
                <IonInput value={this.state.teamHome} onIonChange={e => this.setState({ teamHome: e.target.value })}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Equipo Visitante</IonLabel>
                <IonInput value={this.state.teamAway} onIonChange={e => this.setState({ teamAway: e.target.value })}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Categoria</IonLabel>
                <IonInput value={this.state.category} maxlength={2} onIonChange={e => this.setState({ category: e.target.value })}></IonInput>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Genero</IonLabel>
                <IonSelect value={this.state.gender} placeholder="Seleccionar" onIonChange={e => this.setState({ gender: e.target.value })}>
                  <IonSelectOption value="f">Femenino</IonSelectOption>
                  <IonSelectOption value="m">Masculino</IonSelectOption>
                </IonSelect>
              </IonItem>
              <IonItem>
                <IonLabel position="floating">Notas</IonLabel>
                <IonInput value={this.state.notes} onIonChange={(e) => this.setState({ notes: e.target.value })}></IonInput>
              </IonItem>
            </IonList>

            <IonButton color="lightBlue" size="medium" onClick={this.showPlayerList.bind(this)} width="100%" expand="block">Jugadoras</IonButton>

            <IonButton color="darkBlue" size="medium" onClick={this.onSave.bind(this)} expand="block" >Crear</IonButton>

            <IonLoading isOpen={this.state.showLoading} message={'Por favor espere...'} />
            <IonToast color="danger" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message={this.state.error} duration={2000} />
          </>
          : <></>
        }
        {this.state.renderPlayerList ? <MatchPlayerList onSave={this.onSavePlayers} playerList={this.state.playerList} /> : <> </>}
        <AuthRedirect />
      </>
    );
  }
}

MatchCreate.propTypes = {
  createMatch: PropTypes.func.isRequired,
}

export default connect(null, { createMatch })(MatchCreate)
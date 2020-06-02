import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatch, fetchMatchesPlayers } from '../../../actions/match'
import { connect } from 'react-redux'

import {
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
  IonItemDivider,
  IonListHeader,
  IonButtons,
  IonIcon,
  IonChip,
} from '@ionic/react';
import StatTypeView from './StatTypeView';
import StatPlayerView from './StatPlayerView';
import AuthRedirect from '../../user/AuthRedirect';
import StatTypeGraphView from './StatTypeGraphView';
import ZoneView from './ZoneView';
import CONSTANTS from '../../../helpers/Constants';
import URL_REPO from '../../../helpers/UrlRepo';

class StatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchId: this.props.match.params.id,
      quarter: 'q1',
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      playerAgreggatedList: [],
      renderStatViewMain: true,
      renderStatType: false,
      renderStatZone: false,
      renderStatPlayer: false,
      renderStatTypeGraphView: false,
    }

    this.selectType = this.selectType.bind(this);
    this.selectQuarter = this.selectQuarter.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount() {
    global.backFunction = () => {
      this.resetRender()
      if (this.state.renderStatViewMain) {
        global.defaultBackFunction()
      } else {
        this.resetToMainState()
      }
    }
    if (this.state.matchId === CONSTANTS.ALL_MATCHES) {
      this.fetchAllPlayers()
    } else {
      this.props.fetchMatch(this.state.matchId);
    }
  }

  resetToMainState() {
    this.setState({
      renderStatViewMain: true,
      fromStatZone: false,
      fromStatTypeGraph: false,
      quarter: 'q1',
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
    })
  }

  fetchAllPlayers() {
    this.props.fetchMatchesPlayers().then(response => {
      if (response.success) {
        let playerAgreggatedListTemp = []
        if (response.data.length > 0) {
          response.data.forEach(matchPlayersItem => {
            playerAgreggatedListTemp.push(...matchPlayersItem.playerList)
          });
          this.setState({ playerAgreggatedList: Array.from(new Set(playerAgreggatedListTemp)) })
        }
      }
    })
  }

  resetRender() {
    this.setState({
      renderStatViewMain: false,
      renderStatType: false,
      renderStatZone: false,
      renderStatPlayer: false,
      renderStatTypeGraphView: false,
    })
  }

  refreshRender() {
    var tempState = this.state;
    this.resetRender()
    this.setState(tempState)
  }

  onStatType() {
    this.resetRender()
    this.setState({ renderStatType: true, fromStatZone: true });
  }

  onPlayer() {
    this.resetRender()
    this.setState({ renderStatPlayer: true, fromStatTypeGraph: true })
  }

  selectType(statType) {
    this.resetRender()
    this.setState({ statType: statType.value, statZoneType: statType.zone })
    if (this.state.fromStatTypeGraph) {
      this.setState({ renderStatTypeGraphView: true })
    } else if (this.state.fromStatZone) {
      this.setState({ renderStatZone: true })
    }
  }

  selectQuarter(value) {
    this.setState({ quarter: value });
  }

  selectZone(value) {
    this.resetRender()
    this.setState({ renderStatPlayer: true, statZoneValue: value });
  }

  selectPlayer(value) {
    this.resetRender();
    this.setState({ player: value })
    if (this.state.fromStatTypeGraph) {
      this.setState({ renderStatTypeGraphView: true })
    } else {
      this.setState({ renderStatZone: true })
    }
  }

  onPlayersFilter() {
    this.resetRender()
    this.setState({ renderStatPlayer: true })
  }

  onStatFilter() {
    this.setState({
      fromStatTypeGraph: this.state.renderStatTypeGraphView,
      fromStatZone: this.state.renderStatZone
    })
    this.resetRender()
    this.setState({ renderStatType: true })
  }

  onSuccess() {
    this.setState({
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      renderStatType: true,
      renderStatZone: false,
      renderStatPlayer: false,
    });
  }

  getPlayerList() {
    if (this.state.matchId === CONSTANTS.ALL_MATCHES) {
      return this.state.playerAgreggatedList
    } else {
      return this.props.matchDetails.playerList
    }
  }

  onMatchRemove() {
    this.props.history.push(URL_REPO.ALL_STAT_VIEW)
    this.setState({ matchId: CONSTANTS.ALL_MATCHES })
    this.fetchAllPlayers()
    setTimeout(() => {
      this.refreshRender()
    }, CONSTANTS.TIMEOUT);
  }

  onPlayerRemove() {
    this.setState({player: CONSTANTS.EMPTY_PLAYERS})
    setTimeout(() => {
      this.refreshRender()
    }, CONSTANTS.TIMEOUT);
  }

  render() {
    return (
      <>
        <IonListHeader>
          {this.state.matchId === CONSTANTS.ALL_MATCHES ? <></> :
            <IonChip color="itemColorLightBlue" onClick={this.onMatchRemove.bind(this)}>
              <IonLabel><h2>{this.props.matchDetails.teamHome} - {this.props.matchDetails.teamAway}</h2></IonLabel>
              <IonIcon name="close-circle" />
            </IonChip>
          }
          {this.state.renderStatZone && this.state.player ?
            <IonChip color="itemColorLightBlue" onClick={this.onPlayerRemove.bind(this)}>
              <IonLabel><h2>{this.state.player}</h2></IonLabel>
              <IonIcon name="close-circle" />
            </IonChip>
            : <IonLabel></IonLabel>}
          <IonButtons >
            {this.state.renderStatTypeGraphView || this.state.renderStatZone ?
              <IonButton class="statOptionsButton" onClick={this.onPlayersFilter.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" name="people" />
              </IonButton>
              : <></>}
            {this.state.renderStatZone ?
              <IonButton class="statOptionsButton" onClick={this.onStatFilter.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" name="options" />
              </IonButton>
              : <></>
            }
          </IonButtons>
        </IonListHeader>
        <IonItemDivider />
        {this.state.renderStatViewMain ?
          <IonGrid fixed={true} class="statViewGrid">
            <IonRow>
              <IonCol>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton class="statViewButton" fill="outline" size="large" onClick={this.onStatType.bind(this)}>POR TIPO ESTADISTICA</IonButton>
              </IonCol>
              <IonCol>
                <IonButton class="statViewButton" fill="outline" size="large" onClick={this.onPlayer.bind(this)}>POR JUGADOR</IonButton>
              </IonCol>
            </IonRow>
            <IonRow />
          </IonGrid>
          : <></>}
        {this.state.renderStatType ? <StatTypeView value={this.state.quarter} selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderStatZone ? <ZoneView player={this.state.player} statZoneType={this.state.statZoneType} matchId={this.state.matchId} selectZone={this.selectZone} statType={this.state.statType} /> : <> </>}
        {this.state.renderStatPlayer ? <StatPlayerView selectPlayer={this.selectPlayer} playerList={this.getPlayerList()} /> : <> </>}
        {this.state.renderStatTypeGraphView ? <StatTypeGraphView matchId={this.state.matchId} player={this.state.player} /> : <> </>}
        <AuthRedirect />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    matchDetails: state.match.details,
  }
}

StatView.propTypes = {
  fetchMatch: PropTypes.func.isRequired,
  fetchMatchesPlayers: PropTypes.func.isRequired,
  matchDetails: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { fetchMatch, fetchMatchesPlayers })(StatView)
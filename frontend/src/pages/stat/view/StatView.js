import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatch, fetchMatchesPlayers } from '../../../actions/match'
import { connect } from 'react-redux'
import { fetchStats } from '../../../actions/stat'

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

const defaultRenderState = {
  renderStatViewMain: true,
  renderStatType: false,
  renderStatZone: false,
  renderStatPlayer: false,
  renderStatTypeGraphView: false,
}

const blankRenderState = {
  renderStatViewMain: false,
  renderStatType: false,
  renderStatZone: false,
  renderStatPlayer: false,
  renderStatTypeGraphView: false,
}

class StatView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchId: this.props.match.params.id,
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      playerAgreggatedList: [],
      matchStatList: [],
      renderState: defaultRenderState
    }

    this.selectType = this.selectType.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount() {
    global.backFunction = () => {
      if (this.state.renderState.renderStatViewMain) {
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
    this.fetchMatchStats()
  }

  fetchMatchStats() {
    return Promise.resolve(this.props.fetchStats(this.state.matchId).then(response => {
      this.setState({ matchStatList: response.data })
    }))
  }

  fetchAllPlayers() {
    return Promise.resolve(this.props.fetchMatchesPlayers().then(response => {
      if (response.success) {
        let playerAgreggatedListTemp = []
        if (response.data.length > 0) {
          response.data.forEach(matchPlayersItem => {
            playerAgreggatedListTemp.push(...matchPlayersItem.playerList)
          });
          this.setState({ playerAgreggatedList: Array.from(new Set(playerAgreggatedListTemp)) })
        }
      }
    }))
  }

  resetToMainState() {
    this.setState({
      fromStatZone: false,
      fromStatTypeGraph: false,
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      renderState: defaultRenderState,
    })
  }

  refreshRender() {
    var previousRenderState = this.state.renderState;
    this.setState({ renderState: blankRenderState })
    setTimeout(() => {
      this.setState({ renderState: previousRenderState })
    }, CONSTANTS.TIMEOUT);
  }

  onStatType() {
    this.setState({ renderState: { renderStatType: true }, fromStatZone: true });
  }

  onPlayer() {
    this.setState({ renderState: { renderStatPlayer: true }, fromStatTypeGraph: true })
  }

  selectType(statType) {
    this.setState({ statType: statType.value, statZoneType: statType.zone })
    if (this.state.fromStatTypeGraph) {
      this.setState({ renderState: { renderStatTypeGraphView: true } })
    } else if (this.state.fromStatZone) {
      this.setState({ renderState: { renderStatZone: true } })
    }
  }

  selectZone(value) {
    this.setState({ renderState: { renderStatPlayer: true }, statZoneValue: value });
  }

  selectPlayer(value) {
    this.setState({ player: value })
    if (this.state.fromStatTypeGraph) {
      this.setState({ renderState: { renderStatTypeGraphView: true } })
    } else {
      this.setState({ renderState: { renderStatZone: true } })
    }
  }

  onPlayersFilter() {
    this.setState({ renderState: { renderStatPlayer: true } })
  }

  onStatFilter() {
    this.setState({
      fromStatTypeGraph: this.state.renderState.renderStatTypeGraphView,
      fromStatZone: this.state.renderState.renderStatZone
    })
    this.setState({ renderState: { renderStatType: true } })
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
    this.fetchAllPlayers().then(() => {
      this.fetchMatchStats().then(() => {
        this.refreshRender()
      })
    })
  }

  onPlayerRemove() {
    this.setState({ player: CONSTANTS.EMPTY_PLAYERS })
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
          {this.state.renderState.renderStatZone && this.state.player ?
            <IonChip color="itemColorLightBlue" onClick={this.onPlayerRemove.bind(this)}>
              <IonLabel><h2>{this.state.player}</h2></IonLabel>
              <IonIcon name="close-circle" />
            </IonChip>
            : <IonLabel></IonLabel>}
          <IonButtons >
            {this.state.renderState.renderStatTypeGraphView || this.state.renderState.renderStatZone ?
              <IonButton class="statOptionsButton" onClick={this.onPlayersFilter.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" name="people" />
              </IonButton>
              : <></>}
            {this.state.renderState.renderStatZone ?
              <IonButton class="statOptionsButton" onClick={this.onStatFilter.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" name="options" />
              </IonButton>
              : <></>
            }
          </IonButtons>
        </IonListHeader>
        <IonItemDivider />
        {this.state.renderState.renderStatViewMain ?
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
        {this.state.renderState.renderStatType ? <StatTypeView value={this.state.quarter} selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderState.renderStatZone ? <ZoneView matchStatList={this.state.matchStatList} player={this.state.player} statZoneType={this.state.statZoneType} selectZone={this.selectZone} statType={this.state.statType} /> : <> </>}
        {this.state.renderState.renderStatPlayer ? <StatPlayerView selectPlayer={this.selectPlayer} playerList={this.getPlayerList()} /> : <> </>}
        {this.state.renderState.renderStatTypeGraphView ? <StatTypeGraphView matchStatList={this.state.matchStatList} player={this.state.player} /> : <> </>}
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
  fetchStats: PropTypes.func.isRequired,
  fetchMatchesPlayers: PropTypes.func.isRequired,
  matchDetails: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { fetchStats, fetchMatch, fetchMatchesPlayers })(StatView)
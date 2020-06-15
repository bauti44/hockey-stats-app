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
import { closeCircle, options, people } from 'ionicons/icons';
import { actionStack, ACTION_NAME } from '../../../actionStack/ActionStack';

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

    this.props.history.listen((location) => {
      switch (location.hash) {
        case '#statTypeGraph':
          this.setState({ renderState: { renderStatTypeGraphView: true } })
          break;
        case '#statType':
          this.setState({ renderState: { renderStatType: true } })
          break;
        case '#statPlayer':
          this.setState({ renderState: { renderStatPlayer: true } })
          break;
        case '#statZone':
          this.setState({ renderState: { renderStatZone: true } })
          break;
        default:
          this.resetToMainState()
      }
    })
  }

  componentDidMount() {
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
    this.setState({ fromStatZone: true });
    this.props.history.push('#statType')
    actionStack.push(ACTION_NAME.VIEW_STATS_PER_TYPE)
  }

  onPlayer() {
    this.setState({ fromStatTypeGraph: true })
    this.props.history.push('#statPlayer')
    actionStack.push(ACTION_NAME.VIEW_STATS_PER_PLAYER)
  }

  selectType(statType) {
    this.setState({ statType: statType.value, statZoneType: statType.zone })
    if (this.state.fromStatTypeGraph) {
      this.props.history.push('#statTypeGraph')
    } else if (this.state.fromStatZone) {
      this.props.history.push('#statZone')
    }
    actionStack.push(ACTION_NAME.SELECT_TYPE)
  }

  selectZone(value) {
    this.setState({ statZoneValue: value });
    this.props.history.push('#statPlayer')
    actionStack.push(ACTION_NAME.SELECT_ZONE)
  }

  selectPlayer(value) {
    this.setState({ player: value })
    if (this.state.fromStatTypeGraph) {
      this.props.history.push('#statTypeGraph')
    } else {
      this.props.history.push('#statZone')
    }
    actionStack.push(ACTION_NAME.SELECT_PLAYER)
  }

  onPlayersFilter() {
    this.props.history.push('#statPlayer')
    actionStack.push(ACTION_NAME.PLAYER_FILTER)
  }

  onStatFilter() {
    this.setState({
      fromStatTypeGraph: this.state.renderState.renderStatTypeGraphView,
      fromStatZone: this.state.renderState.renderStatZone
    })
    this.props.history.push('#statType')
    actionStack.push(ACTION_NAME.STAT_FILTER)
  }

  getPlayerList() {
    if (this.state.matchId === CONSTANTS.ALL_MATCHES) {
      return this.state.playerAgreggatedList
    } else {
      return this.props.matchDetails.playerList
    }
  }

  onMatchRemove() {
    this.props.history.push(`${URL_REPO.ALL_STAT_VIEW}${window.location.hash}`)
    this.setState({ matchId: CONSTANTS.ALL_MATCHES })
    this.fetchAllPlayers().then(() => {
      this.fetchMatchStats().then(() => {
        this.refreshRender()
      })
    })
    actionStack.push(ACTION_NAME.MATCH_REMOVE_FROM_FILTER)
  }

  onPlayerRemove() {
    this.setState({ player: CONSTANTS.EMPTY_PLAYERS })
    setTimeout(() => {
      this.refreshRender()
    }, CONSTANTS.TIMEOUT);
    actionStack.push(ACTION_NAME.PLAYER_REMOVE_FROM_FILTER)
  }

  render() {
    return (
      <>
        <IonListHeader>
          {this.state.matchId === CONSTANTS.ALL_MATCHES ? <></> :
            <IonChip color="itemColorLightBlue" onClick={this.onMatchRemove.bind(this)}>
              <IonLabel><h2>{this.props.matchDetails.teamHome} - {this.props.matchDetails.teamAway}</h2></IonLabel>
              <IonIcon icon={closeCircle} />
            </IonChip>
          }
          {(this.state.renderState.renderStatTypeGraphView || this.state.renderState.renderStatZone) && this.state.player ?
            <IonChip color="itemColorLightBlue" onClick={this.onPlayerRemove.bind(this)}>
              <IonLabel><h2>{this.state.player}</h2></IonLabel>
              <IonIcon icon={closeCircle} />
            </IonChip>
            : <></>}
          <IonLabel></IonLabel>
          <IonButtons>
            {this.state.renderState.renderStatTypeGraphView || this.state.renderState.renderStatZone ?
              <IonButton class="statOptionsButton" onClick={this.onPlayersFilter.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" icon={people} />
              </IonButton>
              : <></>}
            {this.state.renderState.renderStatZone || this.state.renderState.renderStatTypeGraphView ?
              <IonButton class="statOptionsButton" onClick={this.onStatFilter.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" icon={options} />
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
        {this.state.renderState.renderStatTypeGraphView ? <StatTypeGraphView matchStatList={this.state.matchStatList} player={this.state.player} statType={this.state.statType} statZoneType={this.state.statZoneType} /> : <> </>}
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
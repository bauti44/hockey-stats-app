import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatch } from '../../../actions/match'
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
} from '@ionic/react';
import StatTypeView from './StatTypeView';
import FieldZoneView from './FieldZoneView';
import StatPlayerView from './StatPlayerView';
import AreaZoneView from './AreaZoneView';
import AuthRedirect from '../../user/AuthRedirect';
import StatTypeGraphView from './StatTypeGraphView';

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
      renderStatViewMain: true,
      renderStatType: false,
      renderStatZoneField: false,
      renderStatZoneArea: false,
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
        this.setState({ renderStatViewMain: true })
      }
    }
    this.props.fetchMatch(this.state.matchId);
  }

  resetRender() {
    this.setState({
      renderStatViewMain: false,
      renderStatType: false,
      renderStatZoneField: false,
      renderStatZoneArea: false,
      renderStatPlayer: false,
      renderStatTypeGraphView: false,
    })
  }

  onStatType() {
    this.resetRender()
    this.setState({ renderStatType: true });
  }

  onPlayer() {
    this.resetRender()
    this.setState({ renderStatPlayer: true });
  }

  selectType(statType) {
    this.resetRender()
    this.setState({ statType: statType.value, statZoneType: statType.zone });
    if (statType.zone == 'field') {
      this.setState({ renderStatZoneField: true });
    } else {
      this.setState({ renderStatZoneArea: true });
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
    this.setState({ player: value, renderStatTypeGraphView: true });
  }

  onOptions() {
    this.resetRender()
    if (this.state.renderStatTypeGraphView) {
      this.setState({ renderStatPlayer: true })
    } else if (this.state.renderStatZoneField || this.state.renderStatZoneArea) {
      this.setState({ renderStatType: true })
    }
  }

  onSuccess() {
    this.setState({
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      renderStatType: true,
      renderStatZoneField: false,
      renderStatZoneArea: false,
      renderStatPlayer: false,
    });
  }

  render() {
    return (
      <>
        <IonListHeader>
          <IonLabel><h1>{this.props.matchDetails.teamHome} - {this.props.matchDetails.teamAway}</h1></IonLabel>
          {this.state.renderStatTypeGraphView || this.state.renderStatZoneField || this.state.renderStatZoneArea ?
            <IonButtons>
              <IonButton onClick={this.onOptions.bind(this)} shape="round" slot="icon-only" style={{ paddingRight: '0.5rem' }}>
                <IonIcon name="options" style={{ fontSize: '24px' }} />
              </IonButton>
            </IonButtons>
            : <></>}
        </IonListHeader>
        <IonItemDivider style={{ minHeight: '0.5rem' }} />
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
        {this.state.renderStatZoneField ? <FieldZoneView matchId={this.state.matchId} selectZone={this.selectZone} statType={this.state.statType} /> : <> </>}
        {this.state.renderStatZoneArea ? <AreaZoneView matchId={this.state.matchId} selectZone={this.selectZone} statType={this.state.statType} /> : <> </>}
        {this.state.renderStatPlayer ? <StatPlayerView selectPlayer={this.selectPlayer} playerList={this.props.matchDetails.playerList} /> : <> </>}
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
  matchDetails: PropTypes.object.isRequired
}

export default connect(mapStateToProps, { fetchMatch })(StatView)
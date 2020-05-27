import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatch } from '../../../actions/match'
import { connect } from 'react-redux'

import {
  IonLoading,
  IonToast,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel,
} from '@ionic/react';
import StatTypeView from './StatTypeView';
import FieldZoneView from './FieldZoneView';
import StatPlayerView from './StatPlayerView';
import AreaZoneView from './AreaZoneView';
import AuthRedirect from '../../user/AuthRedirect';

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
      showLoading: false,
      showToast: false,
      showToastError: false,
      error: ''
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
      } else if (this.state.renderStatType || this.state.renderStatPlayer) {
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
    this.setState({ player: value });
    setTimeout(() => this.submit(), 500);
  }

  submit() {
    this.setState({ showLoading: true })
    let stat = {
      quarter: this.state.quarter,
      statType: this.state.statType,
      statZoneType: this.state.statZoneType,
      statZoneValue: this.state.statZoneValue,
      player: this.state.player,
    }
    this.props.postStat(stat).then(response => {
      if (response.success) {
        setTimeout(() => this.onSuccess(), 500);
      } else {
        this.setState({ isLoading: false, showToastError: true, error: response.errors[0].message })
      }
    })
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
      showLoading: false,
      showToast: true,
      showToastError: false,
      error: ''
    });
  }

  render() {
    return (
      <>
        {this.state.renderStatViewMain ?
          <IonGrid fixed={true} class="statViewGrid">
            <IonRow>
              <IonCol>
                <br />
                <IonLabel><h1>{this.props.matchDetails.teamHome} - {this.props.matchDetails.teamAway}</h1></IonLabel>
                <IonLabel><h2>{this.props.matchDetails.category} {this.props.matchDetails.gender} {this.props.matchDetails.notes}</h2></IonLabel>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonButton class="statViewButton" fill="outline" size="large" onClick={this.onStatType.bind(this)}>Por tipo estadistica</IonButton>
              </IonCol>
              <IonCol>
                <IonButton class="statViewButton" fill="outline" size="large" onClick={this.onPlayer.bind(this)}>Por jugador</IonButton>
              </IonCol>
            </IonRow>
            <IonRow />
          </IonGrid>
          : <></>}
        {this.state.renderStatType ? <StatTypeView value={this.state.quarter} selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderStatZoneField ? <FieldZoneView selectZone={this.selectZone} statType={this.state.statZoneType} /> : <> </>}
        {this.state.renderStatZoneArea ? <AreaZoneView selectZone={this.selectZone} /> : <> </>}
        {this.state.renderStatPlayer ? <StatPlayerView selectPlayer={this.selectPlayer} playerList={this.props.matchDetails.playerList} /> : <> </>}
        <IonLoading isOpen={this.state.showLoading} message={'Por favor espere...'} />
        <IonToast color="success" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message="La estadística se creo exitosamente" duration={2000} />
        <IonToast color="danger" isOpen={this.state.showToastError} onDidDismiss={() => { this.setState({ showToastError: false }) }} message={this.state.error} duration={2000} />
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
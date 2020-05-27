import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatch } from '../../../actions/match'
import { postStat } from '../../../actions/stat'
import { connect } from 'react-redux'

import {
  IonLoading,
  IonToast,
  IonButtons,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonLabel
} from '@ionic/react';
import StatType from './StatType';
import FieldZone from './FieldZone';
import StatPlayer from './StatPlayer';
import AreaZone from './AreaZone';
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
      if (this.state.renderStatType) {
        global.defaultBackFunction()
      } else if (this.state.renderStatZoneField || this.state.renderStatZoneArea) {
        this.setState({ renderStatType: true })
      } else if (this.state.renderStatPlayer && this.state.statZoneType == "field") {
        this.setState({ renderStatZoneField: true })
      } else if (this.state.renderStatPlayer && this.state.statZoneType == "area") {
        this.setState({ renderStatZoneArea: true })
      }
    }
    this.props.fetchMatch(this.state.matchId);
  }

  resetRender() {
    this.setState({
      renderStatType: false,
      renderStatZoneField: false,
      renderStatZoneArea: false,
      renderStatPlayer: false,
    })
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
    console.log(value)
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
        <IonGrid fixed={true} class="statViewGrid">
          <IonRow>
            <IonCol>
              
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol><IonButton class="statViewButton" fill="outline" size="large">Por tipo estadistica</IonButton></IonCol>
            <IonCol><IonButton class="statViewButton" fill="outline" size="large">Por jugador</IonButton></IonCol>
          </IonRow>
          <IonRow></IonRow>
        </IonGrid>
        {this.state.renderStatType ? <StatType value={this.state.quarter} selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderStatZoneField ? <FieldZone selectZone={this.selectZone} /> : <> </>}
        {this.state.renderStatZoneArea ? <AreaZone selectZone={this.selectZone} /> : <> </>}
        {this.state.renderStatPlayer ? <StatPlayer selectPlayer={this.selectPlayer} playerList={this.props.playerList} /> : <> </>}
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
    playerList: state.match.details.playerList
  }
}

StatView.propTypes = {
  fetchMatch: PropTypes.func.isRequired,
  postStat: PropTypes.func.isRequired,
  playerList: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { fetchMatch, postStat })(StatView)
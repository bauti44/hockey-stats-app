import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatch } from '../../../actions/match'
import { postStat } from '../../../actions/stat'
import { connect } from 'react-redux'

import {
  IonLoading,
  IonToast,
  IonListHeader,
  IonLabel,
  IonItemDivider,
  IonButtons,
  IonButton,
  IonIcon,
} from '@ionic/react';
import StatType from './StatType';
import FieldZone from './FieldZone';
import StatPlayer from './StatPlayer';
import AreaZone from './AreaZone';
import AuthRedirect from '../../user/AuthRedirect';
import CONSTANTS from '../../../helpers/Constants';
import { sync, mic } from 'ionicons/icons';
import { actionStack, ACTION_NAME } from '../../../actionStack/ActionStack';

class StatCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchId: this.props.match.params.id,
      quarter: 'q1',
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      rotateField: false,
      renderStatType: true,
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

    this.props.history.listen((location) => {
      this.resetRender()
      switch (location.hash) {
        case '#statZoneField':
          this.setState({ renderStatZoneField: true })
          break;
        case '#statZoneArea':
          this.setState({ renderStatZoneArea: true })
          break;
        case '#statPlayer':
          this.setState({ renderStatPlayer: true })
          break;
        case '#statType':
        default:
          this.setState({ renderStatType: true })
      }
    });
  }

  componentDidMount() {
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
    this.setState({ statType: statType.value, statZoneType: statType.zone });
    if (statType.zone === CONSTANTS.FIELD) {
      this.props.history.push('#statZoneField')
    } else {
      this.props.history.push('#statZoneArea')
    }
    actionStack.push(ACTION_NAME.SELECT_TYPE)
  }

  selectQuarter(value) {
    this.setState({ quarter: value });
    actionStack.push(ACTION_NAME.SELECT_QUARTER)
  }

  selectZone(value) {
    this.setState({ statZoneValue: value });
    this.props.history.push('#statPlayer');
    actionStack.push(ACTION_NAME.SELECT_ZONE)
  }

  selectPlayer(value) {
    this.setState({ player: value });
    setTimeout(() => this.submit(), CONSTANTS.TIMEOUT);
    actionStack.push(ACTION_NAME.SELECT_PLAYER)
  }

  submit() {
    this.setState({ showLoading: true })
    let stat = {
      quarter: this.state.quarter,
      statType: this.state.statType,
      statZoneType: this.state.statZoneType,
      statZoneValue: this.state.statZoneValue,
      player: this.state.player,
      matchId: this.state.matchId,
    }
    this.props.postStat(stat).then(response => {
      if (response.success) {
        setTimeout(() => this.onSuccess(), CONSTANTS.TIMEOUT);
      } else {
        this.setState({ isLoading: false, showToastError: true, error: response.errors[0].message })
      }
    })
    actionStack.push(ACTION_NAME.SUBMIT_STAT)
  }

  onSuccess() {
    this.setState({
      statType: '',
      statZoneType: '',
      statZoneValue: '',
      player: '',
      showLoading: false,
      showToast: true,
      showToastError: false,
      error: ''
    });
    this.props.history.push('#statType')
  }

  onRotateField() {
    let previousValue = this.state.rotateField
    this.setState({ rotateField: !previousValue })
    actionStack.push(ACTION_NAME.ROTATE_FIELD)
  }

  onSpeech() {
    let url = `/match/${this.state.matchId}/stat/speech`;
    this.props.history.push(url);
    actionStack.push(ACTION_NAME.SPEECH_CLICK)
  }

  render() {
    return (
      <>
        <IonListHeader>
          <IonLabel><h1>{this.props.matchDetails.teamHome} - {this.props.matchDetails.teamAway}</h1></IonLabel>
          <IonButtons>
            {this.state.renderStatZoneField ?
              <IonButton class="statOptionsButton" onClick={this.onRotateField.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" icon={sync} />
              </IonButton>
              : <></>
            }
            {this.state.renderStatType ?
              <IonButton class="statOptionsButton" onClick={this.onSpeech.bind(this)} shape="round" slot="icon-only">
                <IonIcon class="statOptionsIcon" icon={mic} />
              </IonButton>
              : <></>
            }
          </IonButtons>
        </IonListHeader>
        <IonItemDivider />
        {this.state.renderStatType ? <StatType value={this.state.quarter} selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderStatZoneField ? <FieldZone rotateField={this.state.rotateField} selectZone={this.selectZone} /> : <> </>}
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
    playerList: state.match.details.playerList,
    matchDetails: state.match.details,
  }
}

StatCreate.propTypes = {
  fetchMatch: PropTypes.func.isRequired,
  postStat: PropTypes.func.isRequired,
  playerList: PropTypes.array.isRequired,
  matchDetails: PropTypes.object.isRequired,
}

StatCreate.defaultProps = {
  playerList: []
}

export default connect(mapStateToProps, { fetchMatch, postStat })(StatCreate)
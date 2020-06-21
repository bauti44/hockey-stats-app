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
  IonAlert,
} from '@ionic/react';
import StatType from './StatType';
import FieldZone from './FieldZone';
import GoalZone from './GoalZone';
import StatPlayer from './StatPlayer';
import AreaZone from './AreaZone';
import AuthRedirect from '../../user/AuthRedirect';
import { CONSTANTS } from '../../../helpers/Constants';
import { sync } from 'ionicons/icons';
import { actionStack, ACTION_NAME } from '../../../actionStack/ActionStack';
import SpeechMainView from '../../../speech/SpeechMainView';
import StatRecognition from '../recognition/StatRecognition';

class StatCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      stat: {
        matchId: this.props.match.params.id,
        quarter: 'q1',
        statType: '',
        statZoneType: '',
        statZoneValue: '',
        statSubZoneValue: '',
        player: ''
      },
      rotateField: false,
      renderStatType: true,
      renderStatZoneField: false,
      renderStatZoneGoal: false,
      renderStatZoneArea: false,
      renderStatPlayer: false,
      showLoading: false,
      showToast: false,
      showToastError: false,
      error: '',
      spottedKeywords: ''
    }

    this.statRecognition = new StatRecognition()

    this.selectType = this.selectType.bind(this);
    this.selectQuarter = this.selectQuarter.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.selectSubZone = this.selectSubZone.bind(this);
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
        case '#statZoneGoal':
          this.setState({ renderStatZoneGoal: true })
          break;
        case '#statType':
        default:
          this.setState({ renderStatType: true })
      }
    });
  }

  componentDidMount() {
    this.props.fetchMatch(this.state.stat.matchId);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.speech && Object.keys(newProps.speech.spottedKeywords).length !== 0 && newProps.speech !== this.props.speech) {
      this.setState({ spottedKeywords: Object.keys(newProps.speech.spottedKeywords).join(',') })
    }
  }

  resetRender() {
    this.setState({
      renderStatType: false,
      renderStatZoneField: false,
      renderStatZoneArea: false,
      renderStatZoneGoal: false,
      renderStatPlayer: false,
    })
  }

  selectType(statType) {
    let stat = Object.assign({}, this.state.stat, { statType: statType.value, statZoneType: statType.zone })
    this.setState({ stat: stat });
    if (statType.zone === CONSTANTS.FIELD) {
      this.props.history.push('#statZoneField')
    } else {
      this.props.history.push('#statZoneArea')
    }
    actionStack.push(ACTION_NAME.SELECT_TYPE)
  }

  selectQuarter(value) {
    let stat = Object.assign({}, this.state.stat, { quarter: value })
    this.setState({ stat: stat });
    actionStack.push(ACTION_NAME.SELECT_QUARTER)
  }

  selectZone(value) {
    let stat = Object.assign({}, this.state.stat, { statZoneValue: value })
    this.setState({ stat: stat });
    if (this.state.stat.statType === CONSTANTS.GOAL) {
      this.props.history.push('#statZoneGoal');
    } else {
      this.props.history.push('#statPlayer');
    }
    actionStack.push(ACTION_NAME.SELECT_ZONE)
  }

  selectSubZone(value) {
    let stat = Object.assign({}, this.state.stat, { statSubZoneValue: value })
    this.setState({ stat: stat });
    this.props.history.push('#statPlayer');
    actionStack.push(ACTION_NAME.SELECT_SUB_ZONE)
  }

  selectPlayer(value) {
    let stat = Object.assign({}, this.state.stat, { player: value })
    this.setState({ stat: stat });
    setTimeout(() => this.saveStat(), CONSTANTS.TIMEOUT);
    actionStack.push(ACTION_NAME.SELECT_PLAYER)
  }

  saveStat() {
    this.setState({ showLoading: true })
    let stat = this.state.stat
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
    var currentQuarter = this.state.stat.quarter;
    this.setState({
      stat: {
        quarter: currentQuarter,
      },
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

  getKeywords() {
    return this.statRecognition.getKeywords()
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
          </IonButtons>
        </IonListHeader>
        <IonItemDivider />
        {this.state.renderStatType ? <StatType value={this.state.stat.quarter} selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderStatZoneField ? <FieldZone rotateField={this.state.rotateField} selectZone={this.selectZone} /> : <> </>}
        {this.state.renderStatZoneGoal ? <GoalZone selectSubZone={this.selectSubZone} /> : <> </>}
        {this.state.renderStatZoneArea ? <AreaZone selectZone={this.selectZone} statType={this.state.stat.statType} /> : <> </>}
        {this.state.renderStatPlayer ? <StatPlayer selectPlayer={this.selectPlayer} playerList={this.props.playerList} /> : <> </>}
        <IonLoading isOpen={this.state.showLoading} message={'Por favor espere...'} />
        <IonToast color="success" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message="La estadística se creo exitosamente" duration={2000} />
        <IonToast color="danger" isOpen={this.state.showToastError} onDidDismiss={() => { this.setState({ showToastError: false }) }} message={this.state.error} duration={2000} />
        <IonAlert message={this.state.spottedKeywords} isOpen={this.state.spottedKeywords !== ''} buttons={['OK']} onDidDismiss={() => this.setState({spottedKeywords: ''})}/>
        <SpeechMainView {...this.props} keywords={this.getKeywords()} />

        <AuthRedirect />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playerList: state.match.details.playerList,
    matchDetails: state.match.details,
    speech: state.speech,
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
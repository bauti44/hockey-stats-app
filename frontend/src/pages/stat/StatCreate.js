import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { createMatch } from '../../actions/match'
import { connect } from 'react-redux'

import {
  IonButton,
  IonMenuButton,
  IonButtons,
  IonLoading,
  IonToast
} from '@ionic/react';
import StatType from './StatType';
import FieldZone from './FieldZone';
import StatPlayer from './StatPlayer';
import AreaZone from './AreaZone';

class StatCreate extends Component {

  constructor(props) {
    super(props);
    this.state = {
      matchId: this.props.match.params.id,
      renderStatType: true,
      renderStatZoneField: false,
      renderStatZoneArea: false,
      renderStatPlayer: false,
      showLoading: false,
      showToast: false,
    }

    this.selectType = this.selectType.bind(this);
    this.selectQuarter = this.selectQuarter.bind(this);
    this.selectZone = this.selectZone.bind(this);
    this.selectPlayer = this.selectPlayer.bind(this);
  }

  componentDidMount() {
    global.backFunction = () => {
      this.resetRender()
      if(this.state.renderStatType) {
        global.defaultBackFunction()
      } else if (this.state.renderStatZoneField || this.state.renderStatZoneArea) {
        this.setState({ renderStatType: true })
      } else if (this.state.renderStatPlayer) {
        this.setState({ renderStatZoneField: true }) //TODO ver que tipo de estadistica era
      }
    }
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
    if (statType.zone == 'field') {
      console.log(statType.zone)
      this.setState({ renderStatZoneField: true });
    } else {
      this.setState({ renderStatZoneArea: true });
    }
  }

  selectQuarter(quarter) {
    console.log(quarter)
  }

  selectZone(zone) {
    this.resetRender()
    this.setState({ renderStatPlayer: true });
  }

  selectPlayer(zone) {
    this.submit()
  }

  submit() {
    this.setState({ showLoading: true })
    setTimeout(() => {
      this.onSuccess();
    }, 2000);
  }

  onSuccess() {
    this.resetRender()
    this.setState({ renderStatType: true, showLoading: false, showToast: true });
  }

  render() {
    return (
      <>
        {this.state.renderStatType ? <StatType selectType={this.selectType} selectQuarter={this.selectQuarter} /> : <> </>}
        {this.state.renderStatZoneField ? <FieldZone selectZone={this.selectZone} /> : <> </>}
        {this.state.renderStatZoneArea ? <AreaZone selectZone={this.selectZone} /> : <> </>}
        {this.state.renderStatPlayer ? <StatPlayer selectPlayer={this.selectPlayer} playerList={this.props.playerList} /> : <> </>}
        <IonLoading isOpen={this.state.showLoading} message={'Por favor espere...'} />
        <IonToast color="success" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message="La estadística se creo exitosamente" duration={2000} />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    playerList: ["Luchi", "Delpi", "Mica", "Ines", "Belu", "Rochi", "Vichi", "Abru", "Lulu", "Francia", "Martu"]
  }
}

StatCreate.propTypes = {
  createMatch: PropTypes.func.isRequired,
  playerList: PropTypes.array.isRequired
}

export default connect(mapStateToProps, { createMatch })(StatCreate)
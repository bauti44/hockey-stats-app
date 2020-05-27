import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';
import { fetchStats } from '../../../actions/stat'
import { connect } from 'react-redux'


import {
  IonGrid, IonRow, IonCol, IonLabel,
} from '@ionic/react';

class FieldZoneView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      statZoneMap: {}
    }
  }

  componentDidMount() {
    this.props.fetchStats()
  }

  render() {
    return (
      <>
        <IonGrid class="field" fixed={true} >
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsForZone(this.props.statList, '10')}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsForZone(this.props.statList, '11')}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsForZone(this.props.statList, '12')}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsForZone(this.props.statList, '7')}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsForZone(this.props.statList, '8')}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsForZone(this.props.statList, '9')}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsForZone(this.props.statList, '4')}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsForZone(this.props.statList, '5')}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsForZone(this.props.statList, '6')}</IonLabel>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol class="left">
              <IonLabel>{this.props.statsForZone(this.props.statList, '1')}</IonLabel>
            </IonCol>
            <IonCol class="center">
              <IonLabel>{this.props.statsForZone(this.props.statList, '2')}</IonLabel>
            </IonCol>
            <IonCol class="right">
              <IonLabel>{this.props.statsForZone(this.props.statList, '3')}</IonLabel>
            </IonCol>
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

const calculateStatsForZone = (list, zone) => {
  return list.filter(item => { return item.statZoneValue == zone }).length
}

FieldZoneView.propTypes = {
  selectZone: PropTypes.func.isRequired,
  fetchStats: PropTypes.func.isRequired,
  statsForZone: PropTypes.func.isRequired
}

FieldZoneView.defaultProps = {
  statsForZone: calculateStatsForZone
}

const mapStateToProps = (state) => {
  return {
    statList: state.stats.list,
  }
}

export default connect(mapStateToProps, { fetchStats })(FieldZoneView);
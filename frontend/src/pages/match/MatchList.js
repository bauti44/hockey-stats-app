import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatches } from '../../actions/match'
import { connect } from 'react-redux'
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonListHeader, IonFab, IonFabButton, IonIcon, IonRefresher, IonRefresherContent, IonToast } from '@ionic/react';
import AuthRedirect from '../user/AuthRedirect';

class MatchList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showToast: false
    }
  }

  componentDidMount() {
    global.backFunction = global.defaultBackFunction;
    this.props.fetchMatches()

    setTimeout(() => {
      let showSuccess = window.location.search?.indexOf('showSuccess') !== -1;
      this.setState({ showToast: showSuccess })
    }, 500)
  }

  createStat(id) {
    let url = '/match/' + id + '/stat/add';
    this.props.history.push(url);
  }

  onCreateMatchClick() {
    this.props.history.push('/match/create');
  }

  doRefresh(event) {
    this.props.fetchMatches().then(() => {
      event.detail.complete()
    })
  }

  render() {
    return (
      <>
        <IonRefresher slot="fixed" onIonRefresh={this.doRefresh.bind(this)}>
          <IonRefresherContent></IonRefresherContent>
        </IonRefresher>
        <IonList>
          <IonListHeader>
            <IonLabel><h1>Partidos</h1></IonLabel>
          </IonListHeader>
          {
            this.props.matchList.list.map(({ _id, teamHome, teamAway, category, gender, notes }) => (
              <IonItemSliding key={_id}>
                <IonItem>
                  <IonLabel>{teamHome} - {teamAway}</IonLabel>
                  <IonLabel class="label-secondary">{category} {gender} {notes}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="darkBlue" onClick={this.createStat.bind(this, _id)}>Agregar</IonItemOption>
                  <IonItemOption color="lightBlue" onClick={() => console.log('unread clicked')}>Ver</IonItemOption>
                </IonItemOptions>
              </IonItemSliding>
            ))
          }
        </IonList>
        <IonToast color="success" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message="El partido se creo exitosamente" duration={2000} />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="fabButtonAdd" name="ion-fab-button">
            <IonIcon name="add" onClick={this.onCreateMatchClick.bind(this)} />
          </IonFabButton>
        </IonFab>
        <AuthRedirect />
      </>
    );
  }
}

MatchList.propTypes = {
  matchList: PropTypes.object.isRequired,
  fetchMatches: PropTypes.func.isRequired
}

MatchList.defaultProps = {
  matchList: {
    list: []
  }
}

const mapStateToProps = (state) => {

  return {
    matchList: state.matches
  }
}

export default connect(mapStateToProps, { fetchMatches })(MatchList)
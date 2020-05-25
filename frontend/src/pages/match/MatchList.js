import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatches } from '../../actions/match'
import { connect } from 'react-redux'
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonListHeader, IonFab, IonFabButton, IonIcon } from '@ionic/react';
import AuthRedirect from '../user/AuthRedirect';

class MatchList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    global.backFunction = global.defaultBackFunction;
    global.homeFunction = () => this.props.history.push('/match/list');
    this.props.fetchMatches()
  }

  createStat(id) {
    let url = '/match/' + id + '/stat/add';
    this.props.history.push(url);
  }

  onCreateMatchClick() {
    this.props.history.push('/match/create');
  }

  render() {
    return (
      <>
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
  console.log(state);
  return {
    matchList: state.matches
  }
}

export default connect(mapStateToProps, { fetchMatches })(MatchList)
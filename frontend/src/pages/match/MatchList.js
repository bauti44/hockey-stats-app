import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { fetchMatches, removeMatch } from '../../actions/match'
import { connect } from 'react-redux'
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonListHeader, IonFab, IonFabButton, IonIcon, IonRefresher, IonRefresherContent, IonToast, IonSearchbar, IonButton, IonItemDivider, IonButtons } from '@ionic/react';
import AuthRedirect from '../user/AuthRedirect';
import CONSTANTS from '../../helpers/Constants';
import URL_REPO from '../../helpers/UrlRepo';
import { trash } from 'ionicons/icons';
import { options, create, eye, add } from 'ionicons/icons';

class MatchList extends Component {

  constructor(props) {
    super(props);

    this.state = {
      showToast: false,
      showSearch: false,
      searchText: '',
      message: 'El partido se creo exitosamente'
    }
  }

  componentDidMount() {
    global.backFunction = global.defaultBackFunction;
    this.props.fetchMatches()

    setTimeout(() => {
      let showSuccess = window.location.search?.indexOf(CONSTANTS.SHOW_SUCCESS_FLAG) !== -1;
      this.setState({ showToast: showSuccess })
    }, CONSTANTS.TIMEOUT)
  }

  createStat(id) {
    let url = '/match/' + id + '/stat/add';
    this.props.history.push(url);
  }

  viewStat(id) {
    let url = '/match/' + id + '/stat/view';
    this.props.history.push(url);
  }

  onCreateMatchClick() {
    this.props.history.push(URL_REPO.MATCH_CREATE);
  }

  doRefresh(event) {
    this.props.fetchMatches().then(() => {
      event.detail.complete()
    })
  }

  toggleSearch() {
    let newShowSearch = !this.state.showSearch
    this.setState({ showSearch: newShowSearch })
  }

  removeMatch(matchId) {
    this.props.removeMatch(matchId).then((response) => {
      if (response.success) {
        this.setState({ showToast: true, message: 'El partido se eliminó exitosamente' })
      }
      this.props.fetchMatches()
    })
  }

  onSearch(value) {
    this.setState({ searchText: value })
  }

  joinText(...values) {
    if (!values && values.length === 0) {
      return '';
    }
    return values.join('').toLowerCase();
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
            <IonButtons>
              <IonButton class="matchListOptionButton" shape="round" slot="icon-only" onClick={this.toggleSearch.bind(this)}>
                <IonIcon class="matchListOptionIcon" icon={options} />
              </IonButton>
            </IonButtons>
          </IonListHeader>
          <IonItemDivider />
          {this.state.showSearch ?
            <IonSearchbar value={this.state.searchText} placeholder="Buscar" onIonChange={e => this.onSearch(e.detail.value)}></IonSearchbar>
            : <></>}
          {this.props.matchList.list.map(({ _id, teamHome, teamAway, category, gender, notes }) => (
            <IonItemSliding key={_id}
              style={{ display: (this.joinText(teamHome, teamAway, category, gender, notes).indexOf(this.state.searchText.toLowerCase()) !== -1) ? 'block' : 'none' }}>
              <IonItem>
                <IonLabel>{teamHome} - {teamAway}</IonLabel>
                <IonLabel class="label-secondary">{category} {gender} {notes}</IonLabel>
              </IonItem>
              <IonItemOptions side="start">
                <IonItemOption color="salmon" onClick={this.removeMatch.bind(this, _id)}>
                  <IonIcon class="sliderIcon" icon={trash} />
                </IonItemOption>
              </IonItemOptions>
              <IonItemOptions side="end">
                <IonItemOption color="darkBlue" onClick={this.createStat.bind(this, _id)}>
                  <IonIcon class="sliderIcon white" icon={create} />
                </IonItemOption>
                <IonItemOption color="lightBlue" onClick={this.viewStat.bind(this, _id)}>
                  <IonIcon class="sliderIcon" icon={eye} />
                </IonItemOption>
              </IonItemOptions>
            </IonItemSliding>
          ))
          }
        </IonList>
        <IonToast color="success" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message={this.state.message} duration={2000} />
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="fabButtonAdd" name="ion-fab-button">
            <IonIcon icon={add} onClick={this.onCreateMatchClick.bind(this)} />
          </IonFabButton>
        </IonFab>
        <AuthRedirect />
      </>
    );
  }
}

MatchList.propTypes = {
  matchList: PropTypes.object.isRequired,
  fetchMatches: PropTypes.func.isRequired,
  removeMatch: PropTypes.func.isRequired
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

export default connect(mapStateToProps, { fetchMatches, removeMatch })(MatchList)
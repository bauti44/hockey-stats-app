import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { createMatch } from '../../actions/match'
import { connect } from 'react-redux'
import { IonList, IonItemSliding, IonItem, IonLabel, IonItemOptions, IonItemOption, IonListHeader, IonFab, IonFabButton, IonIcon } from '@ionic/react';

class MatchList extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount () {
    global.backFunction = global.defaultBackFunction;
    global.homeFunction = () => this.props.history.push('/match/list');
  }

  createStat(id) {
    let url = `/match/$id/stat/add`;
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
            this.props.matchList.map(({ id, name }) => (
              <IonItemSliding key={id}>
                <IonItem>
                  <IonLabel>{name}</IonLabel>
                </IonItem>
                <IonItemOptions side="end">
                  <IonItemOption color="darkBlue" onClick={this.createStat.bind(this, id)}>Agregar</IonItemOption>
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
      </>
    );
  }
}

MatchList.propTypes = {
  matchList: PropTypes.array.isRequired
}

const mapStateToProps = (state) => {
  return {
    matchList: [{ id: "1", name: "GEBA - LICEO" }, { id: "2", name: "LICEO - RIVER" }]
  }
}

export default connect(mapStateToProps, { createMatch })(MatchList)
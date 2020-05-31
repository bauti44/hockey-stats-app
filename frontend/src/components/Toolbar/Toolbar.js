import React, { Component } from 'react';

import {
  IonIcon,
  IonTabs,
  IonTabBar,
  IonTabButton,
  IonLabel,
  IonButtons,
  IonButton,
  IonToolbar,
  IonFooter,
} from '@ionic/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';

class Toolbar extends Component {

  constructor(props) {
    super(props);
    console.log(this.props.history)
    console.log(this.props.user)
  }

  goBack() {
    global.backFunction()
  }



  render() {
    const { isAuthenticated } = this.props.user
    return (
      <IonFooter>
        <IonToolbar>
          <IonButtons style={{height:'3rem'}}>
            <IonButton>
              <IonIcon class="icon-inner" name="eye" /><br/>
              <IonLabel>
                <h1>ESTADISTICAS</h1>
              </IonLabel>
            </IonButton>
            <IonButton>
              <IonLabel>PARTIDOS</IonLabel>
              <IonIcon name="list" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonFooter>

    );
  }
}

Toolbar.propTypes = {
  user: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, {})
)(Toolbar);
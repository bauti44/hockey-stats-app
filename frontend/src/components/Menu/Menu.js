import React, { Component } from 'react';

import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonIcon,
  IonButton,
} from '@ionic/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  goBack() {
    global.backFunction()
  }

  render() {
    const { isAuthenticated } = this.props.user
    return (
      <IonHeader>
        <IonToolbar color="darkBlue">
          {isAuthenticated ?
            <>
              <IonButtons slot="start">
                <IonBackButton defaultHref="/" onClick={this.goBack.bind(this)} />
              </IonButtons>
              <IonButtons slot="end">
                <IonButton shape="round" slot="icon-only">
                  <a href="/match/list">
                    <IonIcon size="large" name="list" />
                  </a>
                </IonButton>
              </IonButtons>
            </> : <></>}
          <IonTitle>Estadisticas Hockey</IonTitle>
        </IonToolbar>
      </IonHeader>
    );
  }
}

Menu.propTypes = {
  user: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Menu);
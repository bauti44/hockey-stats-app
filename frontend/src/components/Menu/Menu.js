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

class Menu extends Component {

  constructor(props) {
    super(props);
  }

  goBack() {
    global.backFunction()
  }

  goHome() {
    global.homeFunction()
  }

  render() {
    return (
      <IonHeader>
        <IonToolbar color="darkBlue">
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" onClick={this.goBack.bind(this)} />
          </IonButtons>
          <IonButtons slot="end">
            <IonButton slot="icon-only" onClick={this.goHome.bind(this)}>
              <IonIcon size="large" name="home" />
            </IonButton>
          </IonButtons>
          <IonTitle>Estadisticas Hockey</IonTitle>
        </IonToolbar>
      </IonHeader>
    );
  }
}

export default connect(null, {})(Menu);
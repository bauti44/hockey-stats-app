import React, { Component } from 'react';

import {
  IonToolbar,
  IonTitle,
  IonButtons,
  IonBackButton,
  IonHeader,
  IonIcon,
  IonButton,
  IonAlert,
  IonItem,
  IonMenu,
  IonContent,
  IonList,
  IonMenuButton,
  IonMenuToggle,
} from '@ionic/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import URL_REPO from '../../helpers/UrlRepo'

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showAlert: false
    }
  }

  goBack() {
    global.backFunction()
  }

  onTitleClick() {
    this.setState({ showAlert: true })
  }

  render() {
    const { isAuthenticated } = this.props.user
    return (
      <>
        <IonMenu menuId="barMenu" contentId="main" side="start">
          <IonHeader>
            <IonToolbar color="danger">
              <IonTitle>End Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
              <IonItem>Menu Item</IonItem>
            </IonList>
          </IonContent>
        </IonMenu>
        <IonHeader>
          <IonToolbar color="darkBlue">
            {isAuthenticated ?
              <>
                <IonButtons slot="start">
                  <IonBackButton defaultHref={URL_REPO.ROOT} onClick={this.goBack.bind(this)} />
                </IonButtons>
                <IonButtons slot="end">
                  <IonButton shape="round" slot="icon-only">
                    <a href={URL_REPO.MATCH_LIST}>
                      <IonIcon size="large" name="list" />
                    </a>
                  </IonButton>
                  <IonMenuButton menu="barMenu" slot="end">
                    <IonButton shape="round" slot="icon-only">
                      <IonIcon size="large" name="menu" />
                    </IonButton>
                  </IonMenuButton>
                </IonButtons>
              </> : <></>}
            <IonTitle onClick={this.onTitleClick.bind(this)}>Hockey Stats App</IonTitle>
          </IonToolbar>
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => this.setState({ showAlert: false })}
            header={"Hockey Stats App"}
            message={"Author: <a href='mailto:bauti44@gmail.com'>@bauti44</a><br>Version: 1.0<br>"}
            buttons={['OK']}
          />
        </IonHeader>
      </>
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
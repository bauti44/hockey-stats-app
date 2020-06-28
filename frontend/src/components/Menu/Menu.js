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
  IonLabel,
  IonAvatar,
} from '@ionic/react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import URL_REPO from '../../helpers/UrlRepo'
import { withRouter } from 'react-router';
import { compose } from 'redux';
import { menu } from 'ionicons/icons';
import { userLogout } from '../../actions/user'
import { menuController } from "@ionic/core";
import { actionStack, ACTION_NAME } from '../../actionStack/ActionStack'
import { postError } from '../../actions/errors';

class Menu extends Component {

  constructor(props) {
    super(props)
    this.state = {
      showAlert: false,
      showReportMessage: false,
    }
  }

  goBack() {
    actionStack.push(ACTION_NAME.BACK_CLICK)
    global.backFunction()
  }

  onInfoClick() {
    this.setState({ showAlert: true })
  }

  onMatchesClick() {
    menuController.toggle()
    this.props.history.push(URL_REPO.MATCH_LIST)
  }

  onLogoutClick() {
    menuController.toggle()
    this.props.userLogout()
  }

  onReportClick() {
    postError(actionStack.buildErrorReport())
    this.setState({ showReportMessage: true })
  }

  render() {
    const { isAuthenticated } = this.props.user
    return (
      <>
        <IonMenu menuId="barMenu" contentId="main" side="start">
          <IonHeader>
            <IonToolbar color="darkBlue">
              <IonTitle>Menu</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonItem color="itemColorLightBlue">
            <IonAvatar>
              <img src="/assets/avatar.svg" alt="avatar" />
            </IonAvatar>
            <IonLabel class="username">{this.props.user.user.username}</IonLabel>
          </IonItem>
          <IonContent>
            <IonList>
              <IonItem button onClick={() => this.onMatchesClick()}>
                <IonButton fill="transparent" size="medium">
                  <IonLabel>Ir a Partidos</IonLabel>
                </IonButton>
              </IonItem>
              <IonItem button onClick={() => this.onInfoClick()}>
                <IonButton fill="transparent" size="medium">
                  <IonLabel>Ver Informacion</IonLabel>
                </IonButton>
              </IonItem>
              <IonItem button onClick={() => this.onReportClick()}>
                <IonButton fill="transparent" size="medium">
                  <IonLabel>Reportar problema</IonLabel>
                </IonButton>
              </IonItem>
              <IonItem button onClick={() => this.onLogoutClick()}>
                <IonButton fill="transparent" size="medium">
                  <IonLabel>Cerrar sesión</IonLabel>
                </IonButton>
              </IonItem>
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
                  <IonMenuButton menu="barMenu" slot="end">
                    <IonButton shape="round" slot="icon-only">
                      <IonIcon size="large" icon={menu} />
                    </IonButton>
                  </IonMenuButton>
                </IonButtons>
              </> : <></>}
            <IonTitle>Hockey Stats App</IonTitle>
          </IonToolbar>
          <IonAlert
            isOpen={this.state.showAlert}
            onDidDismiss={() => this.setState({ showAlert: false })}
            header={"Hockey Stats App"}
            message={"Author: <a href='mailto:bauti44@gmail.com'>@bauti44</a><br>Version: 1.1<br>"}
            buttons={['OK']}
          />
          <IonAlert
            isOpen={this.state.showReportMessage}
            onDidDismiss={() => this.setState({ showReportMessage: false })}
            header={"Reportar problema"}
            message={"Se envio informacion del problema satisfactioriamente"}
            buttons={['OK']}
          />
        </IonHeader>
      </>
    );
  }
}

Menu.propTypes = {
  user: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default compose(
  withRouter,
  connect(mapStateToProps, { userLogout })
)(Menu);
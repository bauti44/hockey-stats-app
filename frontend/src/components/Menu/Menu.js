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
import URL_REPO from '../../helpers/UrlRepo'


class Menu extends Component {

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
                <IonBackButton defaultHref={URL_REPO.ROOT} onClick={this.goBack.bind(this)} />
              </IonButtons>
              <IonButtons slot="end">
                <IonButton shape="round" slot="icon-only">
                  <a href={URL_REPO.MATCH_LIST}>
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
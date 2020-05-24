import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route } from 'react-router-dom';

// components
import Menu from '../components/Menu/Menu';

import { IonApp, IonPage, IonContent } from '@ionic/react';

class Layout extends Component {
  static propTypes = { component: PropTypes.object };

  render() {

    const {
      component: Component,
      ...props
    } = this.props;

    return (
      <Fragment>
        
      </Fragment>
    )
  }
}

export default Layout;

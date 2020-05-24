import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonImg,
} from '@ionic/react';

class AreaZone extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IonImg src="/assets/area.png" onClick={this.props.selectZone.bind(this)} />
    );
  }
}

AreaZone.propTypes = {
  selectZone: PropTypes.func.isRequired
}

export default AreaZone;
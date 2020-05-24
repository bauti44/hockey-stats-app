import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonImg,
} from '@ionic/react';

class FieldZone extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <IonImg src="/assets/field.png" onClick={this.props.selectZone.bind(this)} />
    );
  }
}

FieldZone.propTypes = {
  selectZone: PropTypes.func.isRequired
}

export default FieldZone;
import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol,
} from '@ionic/react';

class FieldZone extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <IonGrid class="field" fixed={true} >
          <IonRow>
            <IonCol class="left" onClick={this.props.selectZone.bind(this, 10)} />
            <IonCol class="center" onClick={this.props.selectZone.bind(this, 11)} />
            <IonCol class="right" onClick={this.props.selectZone.bind(this, 12)} />
          </IonRow>
          <IonRow>
            <IonCol class="left" onClick={this.props.selectZone.bind(this, 7)} />
            <IonCol class="center" onClick={this.props.selectZone.bind(this, 8)} />
            <IonCol class="right" onClick={this.props.selectZone.bind(this, 9)} />
          </IonRow>
          <IonRow>
            <IonCol class="left" onClick={this.props.selectZone.bind(this, 4)} />
            <IonCol class="center" onClick={this.props.selectZone.bind(this, 5)} />
            <IonCol class="right" onClick={this.props.selectZone.bind(this, 6)} />
          </IonRow>
          <IonRow>
            <IonCol class="left" onClick={this.props.selectZone.bind(this, 1)} />
            <IonCol class="center" onClick={this.props.selectZone.bind(this, 2)} />
            <IonCol class="right" onClick={this.props.selectZone.bind(this, 3)} />
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

FieldZone.propTypes = {
  selectZone: PropTypes.func.isRequired
}

export default FieldZone;
import React, { Fragment, Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol
} from '@ionic/react';

class AreaZone extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <IonGrid class="area" fixed={true} >
          <IonRow>
            <IonCol/>
            <IonCol onClick={this.props.selectZone.bind(this, 'er')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'er')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'er')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'yr')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.props.selectZone.bind(this, 'ar')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'ar')} />
            <IonCol offset="1" onClick={this.props.selectZone.bind(this, 'er')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'er')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'yr')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.props.selectZone.bind(this, 'a0')} />
            <IonCol offset="-1" onClick={this.props.selectZone.bind(this, 'a0')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'ac')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'ec')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'yc')} />
          </IonRow>
          <IonRow>
          <IonCol onClick={this.props.selectZone.bind(this, 'a0')} />
            <IonCol offset="-1" onClick={this.props.selectZone.bind(this, 'a0')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'ac')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'ec')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'yc')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.props.selectZone.bind(this, 'al')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'al')} />
            <IonCol offset="1" onClick={this.props.selectZone.bind(this, 'el')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'el')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'yl')} />
          </IonRow>
          <IonRow>
            <IonCol />
            <IonCol onClick={this.props.selectZone.bind(this, 'el')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'el')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'el')} />
            <IonCol onClick={this.props.selectZone.bind(this, 'yl')} />
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

AreaZone.propTypes = {
  selectZone: PropTypes.func.isRequired
}

export default AreaZone;
import React, { Component } from 'react'
import PropTypes from 'prop-types';

import {
  IonGrid, IonRow, IonCol
} from '@ionic/react';


const areaStatType = {
  'eyrd': 'entry-25',
  'earea': 'entry-area',
  'sht': 'inner',
  'pc': 'inner',
  'g': 'inner',
  'ps': 'inner',
}

class AreaZone extends Component {

  validateAndDispatch(value) {
    if (this.props.statType === 'eyrd' && ['yr', 'yc', 'yl'].indexOf(value) !== -1) {
      this.props.selectZone(value)
    } else if (this.props.statType === 'earea' && ['ar', 'ac', 'al'].indexOf(value) !== -1) {
      this.props.selectZone(value)
    } else if (['sht', 'pc', 'g', 'ps'].indexOf(this.props.statType) !== -1 && ['ar', 'ac', 'al', 'a0'].indexOf(value) !== -1) {
      this.props.selectZone(value)
    } else {
      console.error(this.props.statType, value)
    }
    return;
  }

  render() {
    return (
      <>
        <IonGrid class={`area ${areaStatType[this.props.statType]}`} fixed={true} >
          <IonRow>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'ar')}/>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'ar')}/>
            <IonCol />
            <IonCol />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'yr')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'ar')} />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'ar')} />
            <IonCol offset="1" />
            <IonCol />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'yr')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'a0')} />
            <IonCol offset="-1" onClick={this.validateAndDispatch.bind(this, 'a0')} />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'ac')} />
            <IonCol />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'yc')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'a0')} />
            <IonCol offset="-1" onClick={this.validateAndDispatch.bind(this, 'a0')} />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'ac')} />
            <IonCol />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'yc')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'al')} />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'al')} />
            <IonCol offset="1" />
            <IonCol />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'yl')} />
          </IonRow>
          <IonRow>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'al')}/>
            <IonCol onClick={this.validateAndDispatch.bind(this, 'al')}/>
            <IonCol />
            <IonCol />
            <IonCol onClick={this.validateAndDispatch.bind(this, 'yl')} />
          </IonRow>
        </IonGrid>
      </>
    );
  }
}

AreaZone.propTypes = {
  statType: PropTypes.string.isRequired,
  selectZone: PropTypes.func.isRequired
}

export default AreaZone;
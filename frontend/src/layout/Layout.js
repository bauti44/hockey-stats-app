// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react';

class Layout extends Component {

  render() {
    return (
      <IonContent>
        {this.props.children}
      </IonContent>
    )
  }
}

Layout.propTypes = {
  user: PropTypes.object.isRequired,
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, {})(Layout)

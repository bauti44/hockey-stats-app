// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { IonContent } from '@ionic/react';

// App Imports

class Layout extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { isAuthenticated } = this.props.user

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

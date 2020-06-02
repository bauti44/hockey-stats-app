// Imports
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import PropTypes from 'prop-types'

// App Imports
import { postLogin } from '../../actions/user'
import { IonInput, IonButton, IonList, IonLabel, IonItem, IonListHeader, IonToast } from '@ionic/react'
import CONSTANTS from '../../helpers/Constants'

class UserLogin extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      password: '',
      error: '',
      isLoading: false,
      isLoggingIn: false,
      showToast: false,
      logged: false
    }
  }

  onSubmit(event) {
    event.preventDefault()
    let input = {}
    input.username = this.state.username
    input.password = this.state.password

    if (input.username !== '' && input.password !== '') {
      this.setState({ isLoggingIn: true, isLoading: true })

      this.props.postLogin(input).then((response) => {

        if (response.success) {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            showToast: false,
            username: '',
            password: '',
            error: ''
          })

          // Redirect
          setTimeout(() => {
            this.setState({ logged: true })
          }, CONSTANTS.LONG_TIMEOUT)
        } else {
          this.setState({
            isLoading: false,
            isLoggingIn: false,
            error: response.errors[0].message,
            showToast: true
          })
        }
      })
    }
  }

  onChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    return (
      <>
        <form id="form-tweet" onSubmit={this.onSubmit.bind(this)}>
          <IonList>
            <IonListHeader>
              <IonLabel><h1>Iniciar sesion</h1></IonLabel>
            </IonListHeader>
            <IonItem>
              <IonLabel position="floating">Usuario</IonLabel>
              <IonInput name="username" value={this.state.username} onIonChange={this.onChange.bind(this)}></IonInput>
            </IonItem>
            <IonItem>
              <IonLabel position="floating">Contraseña</IonLabel>
              <IonInput name="password" type="password" value={this.state.password} onIonChange={this.onChange.bind(this)}></IonInput>
            </IonItem>
          </IonList>

          <IonButton color="darkBlue" type="submit" size="medium" expand="block" >Iniciar sesion</IonButton>
          <IonToast color="danger" isOpen={this.state.showToast} onDidDismiss={() => { this.setState({ showToast: false }) }} message={this.state.error} duration={2000} />
        </form>

        {this.state.logged ? <Redirect to="/match/list" /> : ''}
      </>
    )
  }
}

UserLogin.propTypes = {
  postLogin: PropTypes.func.isRequired
}

UserLogin.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { postLogin })(UserLogin)

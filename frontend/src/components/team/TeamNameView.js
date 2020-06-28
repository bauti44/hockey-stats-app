import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { IonImg, IonLabel } from '@ionic/react';

class TeamNameView extends Component {
    render() {
        return (
            <IonLabel class="badgeContainer">
                <IonImg class={`badge ${this.props.position}`} src={`/assets/badges/${this.props.badgeImage}`} />
                <IonLabel class="teamName">{this.props.name}</IonLabel>
            </IonLabel>
        )
    }
}

const Separator = () => {
    return (
        <IonLabel class="badgeContainer separator">-</IonLabel>
    )
}

TeamNameView.propTypes = {
    name: PropTypes.string.isRequired,
    badgeImage: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
}

export { TeamNameView, Separator }
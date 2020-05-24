import React, { Fragment } from 'react';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonHeader,
  IonToolbar,
  IonMenuButton,
  IonTitle
} from '@ionic/react';

const Dashboard = ({ history }) => {
  return (
    <Fragment>
      <IonHeader>
      <IonToolbar>
        <IonMenuButton slot="start" />
        <IonTitle>Dashboard Page</IonTitle>
      </IonToolbar>
    </IonHeader>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>Dashboard card</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonButton onclick={(e) => {
          e.preventDefault();
          history.push('/')}}>Home</IonButton>
      </IonContent>
    </Fragment>

  );
}

export default Dashboard;

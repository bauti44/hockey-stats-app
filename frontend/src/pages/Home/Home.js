import React, { Fragment } from 'react';

import {
  IonHeader,
  IonToolbar,
  IonContent,
  IonTitle,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonButton,
  IonMenuButton
} from '@ionic/react';

const Home = ({history}) => {
  return (
    <Fragment>
      <IonHeader>
        <IonToolbar>
          <IonMenuButton slot="start" />
          <IonTitle>Home Page</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>card Home Title</IonCardTitle>
          </IonCardHeader>
        </IonCard>
        <IonButton onclick={(e) => {
          e.preventDefault();
          history.push('/dashboard')}}>Dashboard</IonButton>
      </IonContent>
    </Fragment>
  );
}

export default Home;

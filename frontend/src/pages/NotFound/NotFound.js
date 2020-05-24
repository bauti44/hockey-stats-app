import React from 'react';

import {
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle
} from '@ionic/react';

const NotFound = () => {
  return (
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardTitle>404 - page not found</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
  );
}

export default NotFound;

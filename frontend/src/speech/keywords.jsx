import React from 'react';
import PropTypes from 'prop-types';
import { IonIcon, IonList, IonItem, IonLabel } from '@ionic/react';
import { checkmark, close } from 'ionicons/icons';

// reducer to convert a list of messages into a (flat) list of results
function allResultsReducer(list, message) {
  return list.concat(message.results);
}

// reducer to extract all matched keywords from a list of results
function keywordReducer(keywords, result) {
  Object.keys(result.keywords_result || {}).forEach((k) => {
    keywords[k] = keywords[k] || []; // eslint-disable-line
    keywords[k].push(...result.keywords_result[k]);
  });
  return keywords;
}

function getSpotted(messages) {
  console.log("MENSAJES", messages)
  return messages.reduce(allResultsReducer, []).reduce(keywordReducer, {});
}

export function Keywords(props) {
  const { isInProgress, messages, keywords } = props;
  const notSpotted = isInProgress
    ? 'Not yet spotted.'
    : 'Not spotted.';
  const spotted = getSpotted(messages);
  const list = keywords.map((k) => {
    const spottings = spotted[k];
    return (
      <IonItem key={k}>
        {spottings ? <IonIcon icon={checkmark} /> : <IonIcon icon={close} />}
        <IonLabel>
          <b>{k}</b>: {spottings
            ? 'Spotted - '
            : notSpotted}
          {(spottings || []).map(s => `${s.start_time}-${s.end_time}s (${Math.round(s.confidence * 100)}%)`).join(', ')}
        </IonLabel>
      </IonItem>
    );
  });
  return (
    <IonList>
      {list}
    </IonList>
  );
}

Keywords.propTypes = {
  messages: PropTypes.array.isRequired, // eslint-disable-line
  keywords: PropTypes.array.isRequired, // eslint-disable-line
  isInProgress: PropTypes.bool.isRequired,
};

export function getKeywordsSummary(keywords, messages) {
  const spotted = Object.keys(getSpotted(messages)).length;
  const total = keywords.length;
  return `(${spotted}/${total})`;
}

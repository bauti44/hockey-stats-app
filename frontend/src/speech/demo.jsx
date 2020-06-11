/* eslint no-param-reassign: 0 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import recognizeMicrophone from 'watson-speech/speech-to-text/recognize-microphone';
import Transcript from './transcript.jsx';
import { Keywords, getKeywordsSummary } from './keywords.jsx';
import TimingView from './timing.jsx';
import JSONView from './json-view.jsx';
import cachedModels from '../data/models.json';
import { IonIcon, IonToast, IonFab, IonFabButton, IonLabel } from '@ionic/react';
import { fetchSpeechToken } from '../actions/speech.js';
import { connect } from 'react-redux';
import { square, mic } from 'ionicons/icons';

export class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      model: 'es-AR_BroadbandModel',
      rawMessages: [],
      formattedMessages: [],
      audioSource: null,
      speakerLabels: false,
      keywords: 'Perdida,Bloqueo,Recupero,Salida,Infracción,Ingreso,Veinticinco,Ingreso,Area,Tiro,Arco,Corner,Corto,Gol, Penal',
      settingsAtStreamStart: {
        model: '',
        keywords: [],
        speakerLabels: false,
      },
      error: null,
      recordingTime: "00:00"
    };
    this.timeInterval = null;
    this.reset = this.reset.bind(this);
    this.captureSettings = this.captureSettings.bind(this);
    this.stopTranscription = this.stopTranscription.bind(this);
    this.getRecognizeOptions = this.getRecognizeOptions.bind(this);
    this.isNarrowBand = this.isNarrowBand.bind(this);
    this.handleMicClick = this.handleMicClick.bind(this);
    this.handleStream = this.handleStream.bind(this);
    this.handleRawMessage = this.handleRawMessage.bind(this);
    this.handleFormattedMessage = this.handleFormattedMessage.bind(this);
    this.handleTranscriptEnd = this.handleTranscriptEnd.bind(this);
    this.supportsSpeakerLabels = this.supportsSpeakerLabels.bind(this);
    this.handleSpeakerLabelsChange = this.handleSpeakerLabelsChange.bind(this);
    this.getKeywordsArr = this.getKeywordsArr.bind(this);
    this.getKeywordsArrUnique = this.getKeywordsArrUnique.bind(this);
    this.getFinalResults = this.getFinalResults.bind(this);
    this.getCurrentInterimResult = this.getCurrentInterimResult.bind(this);
    this.getFinalAndLatestInterimResult = this.getFinalAndLatestInterimResult.bind(this);
    this.handleError = this.handleError.bind(this);
  }

  reset() {
    if (this.state.audioSource) {
      this.stopTranscription();
    }
    this.setState({ rawMessages: [], formattedMessages: [], error: null });
  }

  /**
     * The behavior of several of the views depends on the settings when the
     * transcription was started. So, this stores those values in a settingsAtStreamStart object.
     */
  captureSettings() {
    const { model, speakerLabels } = this.state;
    this.setState({
      settingsAtStreamStart: {
        model,
        keywords: this.getKeywordsArrUnique(),
        speakerLabels,
      },
    });
  }

  stopTranscription() {
    if (this.stream) {
      this.stream.stop();
      // this.stream.removeAllListeners();
      // this.stream.recognizeStream.removeAllListeners();
    }
    this.setState({ audioSource: null });
  }

  getRecognizeOptions(extra) {
    const keywords = this.getKeywordsArrUnique();
    return Object.assign({
      // formats phone numbers, currency, etc. (server-side)
      access_token: this.state.accessToken,
      token: this.state.token,
      smart_formatting: true,
      format: true, // adds capitals, periods, and a few other things (client-side)
      model: this.state.model,
      objectMode: true,
      interim_results: true,
      // note: in normal usage, you'd probably set this a bit higher
      word_alternatives_threshold: 0.01,
      keywords,
      keywords_threshold: keywords.length
        ? 0.01
        : undefined, // note: in normal usage, you'd probably set this a bit higher
      timestamps: true, // set timestamps for each word - automatically turned on by speaker_labels
      // includes the speaker_labels in separate objects unless resultsBySpeaker is enabled
      speaker_labels: this.state.speakerLabels,
      // combines speaker_labels and results together into single objects,
      // making for easier transcript outputting
      resultsBySpeaker: this.state.speakerLabels,
      // allow interim results through before the speaker has been determined
      speakerlessInterim: this.state.speakerLabels,
      url: this.state.serviceUrl,
    }, extra);
  }

  isNarrowBand(model) {
    model = model || this.state.model;
    return model.indexOf('Narrowband') !== -1;
  }

  startRecordingTime() {
    var time = 0;
    this.timeInterval = setInterval(() => {
      time++
      this.setState({ recordingTime: '00:' + this.pad(time % 60) })
    }, 1000);
  }

  stopRecordingTime() {
    clearInterval(this.timeInterval)
    this.setState({ recordingTime: '00:00' })
  }

  pad(val) {
    var valString = val + "";
    if (valString.length < 2) {
      return "0" + valString;
    } else {
      return valString;
    }
  }

  handleMicClick() {
    if (this.state.audioSource === 'mic') {
      this.stopRecordingTime()
      this.stopTranscription();
      return;
    }
    this.startRecordingTime()
    this.reset();
    this.setState({ audioSource: 'mic' });

    // The recognizeMicrophone() method is a helper method provided by the watson-speech package
    // It sets up the microphone, converts and downsamples the audio, and then transcribes it
    // over a WebSocket connection
    // It also provides a number of optional features, some of which are enabled by default:
    //  * enables object mode by default (options.objectMode)
    //  * formats results (Capitals, periods, etc.) (options.format)
    //  * outputs the text to a DOM element - not used in this demo because it doesn't play nice
    // with react (options.outputElement)
    //  * a few other things for backwards compatibility and sane defaults
    // In addition to this, it passes other service-level options along to the RecognizeStream that
    // manages the actual WebSocket connection.
    this.handleStream(recognizeMicrophone(this.getRecognizeOptions()));
  }

  handleStream(stream) {
    console.log(stream);
    // cleanup old stream if appropriate
    if (this.stream) {
      this.stream.stop();
      this.stream.removeAllListeners();
      this.stream.recognizeStream.removeAllListeners();
    }
    this.stream = stream;
    this.captureSettings();

    // grab the formatted messages and also handle errors and such
    stream.on('data', this.handleFormattedMessage).on('end', this.handleTranscriptEnd).on('error', this.handleError);

    // when errors occur, the end event may not propagate through the helper streams.
    // However, the recognizeStream should always fire a end and close events
    stream.recognizeStream.on('end', () => {
      if (this.state.error) {
        this.handleTranscriptEnd();
      }
    });

    // grab raw messages from the debugging events for display on the JSON tab
    stream.recognizeStream
      .on('message', (frame, json) => this.handleRawMessage({ sent: false, frame, json }))
      .on('send-json', json => this.handleRawMessage({ sent: true, json }))
      .once('send-data', () => this.handleRawMessage({
        sent: true, binary: true, data: true, // discard the binary data to avoid waisting memory
      }))
      .on('close', (code, message) => this.handleRawMessage({ close: true, code, message }));

    // ['open','close','finish','end','error', 'pipe'].forEach(e => {
    //     stream.recognizeStream.on(e, console.log.bind(console, 'rs event: ', e));
    //     stream.on(e, console.log.bind(console, 'stream event: ', e));
    // });
  }

  handleRawMessage(msg) {
    const { rawMessages } = this.state;
    this.setState({ rawMessages: rawMessages.concat(msg) });
  }

  handleFormattedMessage(msg) {
    const { formattedMessages } = this.state;
    this.setState({ formattedMessages: formattedMessages.concat(msg) });
  }

  handleTranscriptEnd() {
    // note: this function will be called twice on a clean end,
    // but may only be called once in the event of an error
    this.setState({ audioSource: null });
  }

  componentDidMount() {
    this.fetchToken();
    // tokens expire after 60 minutes, so automatcally fetch a new one ever 50 minutes
    // Not sure if this will work properly if a computer goes to sleep for > 50 minutes
    // and then wakes back up
    // react automatically binds the call to this
    // eslint-disable-next-line
    this.setState({ tokenInterval: setInterval(this.fetchToken, 50 * 60 * 1000) });
  }

  componentWillUnmount() {
    clearInterval(this.state.tokenInterval);
  }

  fetchToken() {
    this.props.fetchSpeechToken().then((response) => {
      console.log(response)
      if (!response.success) {
        throw new Error('Error retrieving auth token');
      } else {
        this.setState({ ...response.data })
      }
    })
  }

  supportsSpeakerLabels(model) {
    model = model || this.state.model;
    // todo: read the upd-to-date models list instead of the cached one
    return cachedModels.some(m => m.name === model && m.supported_features.speaker_labels);
  }

  handleSpeakerLabelsChange() {
    this.setState(prevState => ({ speakerLabels: !prevState.speakerLabels }));
  }

  // cleans up the keywords string into an array of individual, trimmed, non-empty keywords/phrases
  getKeywordsArr() {
    return this.state.keywords.split(',').map(k => k.trim()).filter(k => k);
  }

  // cleans up the keywords string and produces a unique list of keywords
  getKeywordsArrUnique() {
    return this.state.keywords
      .split(',')
      .map(k => k.trim())
      .filter((value, index, self) => self.indexOf(value) === index);
  }

  getFinalResults() {
    return this.state.formattedMessages.filter(r => r.results
      && r.results.length && r.results[0].final);
  }

  getCurrentInterimResult() {
    const r = this.state.formattedMessages[this.state.formattedMessages.length - 1];

    // When resultsBySpeaker is enabled, each msg.results array may contain multiple results.
    // However, all results in a given message will be either final or interim, so just checking
    // the first one still works here.
    if (!r || !r.results || !r.results.length || r.results[0].final) {
      return null;
    }
    return r;
  }

  getFinalAndLatestInterimResult() {
    const final = this.getFinalResults();
    const interim = this.getCurrentInterimResult();
    if (interim) {
      final.push(interim);
    }
    return final;
  }

  handleError(err, extra) {
    console.error(err, extra);
    if (err.name === 'UNRECOGNIZED_FORMAT') {
      err = 'Unable to determine content type from file name or header; mp3, wav, flac, ogg, opus, and webm are supported. Please choose a different file.';
    } else if (err.name === 'NotSupportedError' && this.state.audioSource === 'mic') {
      err = 'This browser does not support microphone input.';
    } else if (err.message === '(\'UpsamplingNotAllowed\', 8000, 16000)') {
      err = 'Please select a narrowband voice model to transcribe 8KHz audio files.';
    } else if (err.message === 'Invalid constraint') {
      // iPod Touch does this on iOS 11 - there is a microphone, but Safari claims there isn't
      err = 'Unable to access microphone';
    }
    this.setState({ error: err.message || err });
  }

  render() {
    const {
      token, accessToken, audioSource, error, model, settingsAtStreamStart,
      formattedMessages, rawMessages
    } = this.state;

    const err = error
      ? (
        <IonToast color="danger" isOpen={error} message={error} duration={2000} />
      )
      : null;

    const messages = this.getFinalAndLatestInterimResult();

    return (
      <>
        {(this.state.audioSource === 'mic') ?
          <IonLabel style={{ position: "absolute", bottom: "30px", right: "75px" }}>{this.state.recordingTime}</IonLabel>
          : <></>}
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton id="fabButtonAdd" name="ion-fab-button" onClick={this.handleMicClick.bind(this)}>
            {(this.state.audioSource === 'mic') ? <IonIcon class="white" icon={square} /> : <IonIcon class="white" icon={mic} />}
          </IonFabButton>
        </IonFab>

        {err}
        <Transcript messages={messages} />
        <Keywords messages={messages} keywords={settingsAtStreamStart.keywords} isInProgress={!!audioSource} />

        {false ? <TimingView messages={messages} /> : <></>}
        {false ? <JSONView raw={rawMessages} formatted={formattedMessages} /> : <></>}
      </>
    );
  }
};

Demo.propTypes = {
  fetchSpeechToken: PropTypes.func.isRequired
}

export default connect(null, { fetchSpeechToken })(Demo);

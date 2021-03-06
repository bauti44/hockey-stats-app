import React from 'react';
import ReactDOM from 'react-dom';

import '@ionic/core/css/core.css';
import '@ionic/core/css/ionic.bundle.css';
import './styles/index.scss';

import rootReducer from './reducers/root'
import { createStore, compose, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import jwtDecode from 'jwt-decode'

import App from './App';
import * as serviceWorker from './serviceWorker';
import { setCurrentUser } from './actions/user';
// eslint-disable-next-line
import global from './global'
import { actionStack } from './actionStack/ActionStack';
import { postError } from './actions/errors';
import {CONSTANTS} from './helpers/Constants';

const store = createStore(
    rootReducer,

    compose(
        applyMiddleware(thunk)
    )
)

// User Authentication
const token = localStorage.getItem('token')
if (token && token !== 'undefined' && token !== '') {
    store.dispatch(setCurrentUser(jwtDecode(token)))
}

ReactDOM.render(<App store={store} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

window.onerror = function myErrorHandler(errorMsg, url, lineNumber) {
    setTimeout(() => {
        actionStack.pushError(errorMsg)
        postError(actionStack.buildErrorHandler())
    }, CONSTANTS.TIMEOUT);
    return false;
}
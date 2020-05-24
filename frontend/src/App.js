import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Routes from './Routes';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types'


const App = ({store}) => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Provider>
  );
}

App.propTypes = {
  store: PropTypes.object.isRequired
}

export default App;

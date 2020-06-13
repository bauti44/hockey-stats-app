import React from 'react';
import ReactDOM from 'react-dom';
import StatView from './StatView';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider><StatView /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

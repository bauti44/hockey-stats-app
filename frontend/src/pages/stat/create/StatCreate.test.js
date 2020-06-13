import React from 'react';
import ReactDOM from 'react-dom';
import StatCreate from './StatCreate';
import { Provider } from 'react-redux';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider><StatCreate /></Provider>, div);
  ReactDOM.unmountComponentAtNode(div);
});

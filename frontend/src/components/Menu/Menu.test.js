import React from 'react';
import ReactDOM from 'react-dom';
import Menu from './Menu';
import Router from 'react-router'

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><Menu /></Router>, div);
  ReactDOM.unmountComponentAtNode(div);
});

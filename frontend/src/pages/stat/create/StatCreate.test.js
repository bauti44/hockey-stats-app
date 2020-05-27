import React from 'react';
import ReactDOM from 'react-dom';
import MatchCreate from './MatchCreate';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MatchCreate />, div);
  ReactDOM.unmountComponentAtNode(div);
});

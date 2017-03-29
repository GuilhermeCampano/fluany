import React from 'react';
import { render } from 'react-dom';
import createApp from './App';
import './popup.styl';

const App = createApp(React);

render(
  <App />,
  document.getElementById('app')
);


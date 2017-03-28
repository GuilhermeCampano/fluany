import React from 'react';
import { render } from 'react-dom';
import createApp from './App';

const App = createApp(React);

render(
  <App></App>,
  document.getElementById('app')
);


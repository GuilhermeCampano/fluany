import React from 'react';
import { render } from 'react-dom';
import createApp from './App';

const App = createApp(React);

const props = {
    title: 'teste'
}
render(
  <App {...props}/>,
  document.getElementById('app')
);


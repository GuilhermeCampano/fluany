import React from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import Home from './Home';
import PackConfig from './PackConfig';

const App = () => (
  <div>
      <Home/>
      <PackConfig/>
  </div>
);

export default App;

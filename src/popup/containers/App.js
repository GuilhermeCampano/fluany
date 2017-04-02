import React from 'react';
import { Provider } from 'react-redux';

import PackList from '../components/Pack/PackList';
import configureStore from '../store/configureStore';

const App = () => (
  <div>
    <PackList/>
  </div>
);

export default App;

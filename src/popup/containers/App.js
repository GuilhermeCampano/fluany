import React from 'react';
import { Provider } from 'react-redux';

import Packs from '../components/Pack/packs';
import configureStore from '../store/configureStore';

const App = () => (
  <div>
    <Packs/>
  </div>
);

export default App;

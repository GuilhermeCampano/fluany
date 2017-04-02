import React from 'react';
import { Provider } from 'react-redux';
import Search from '../components/Search/Search';
import PackList from '../components/Pack/PackList';
import configureStore from '../store/configureStore';

const App = () => (
  <div>
    <Search/>
    <PackList/>
  </div>
);

export default App;

import React, {Component} from 'react';
import SelectLanguageOptions from '../SelectLanguageOptions/SelectLanguageOptions';
import Packages from '../Packages/Packages';
import InputInterval from '../InputInterval/InputInterval';
import Points from '../Points/Points';
import Import from '../Import/Import';

class App extends Component {
  constructor(props) {
      super(props);
  }

  render() {
    return (
      <main>
        <Points />
        <InputInterval />
        <SelectLanguageOptions />
        <Import />
        <Packages/>
      </main>
    );
  }
}

export default App;

import { createStore } from 'redux';

import createAddPackage from './components/addPackage';
import packageReducer from './reducers/package';
const store = createStore(packageReducer);

const addPackage = pckg => store.dispatch({type: 'ADD_PACKAGE', pckg});

store.subscribe(() => {
  console.log(store.getState());
});

export default React => () => {
  const NewPackage = createAddPackage(React);

  const addPackageProps = {
    actions: {
      addPackage
    }
  };

  return (
			<div className="content">
				<NewPackage { ...addPackageProps } />
			</div>
  );
};

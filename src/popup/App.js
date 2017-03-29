import { createStore } from 'redux';
import CreatePackage from './components/Pack/CreatePackage';
import CreatePacks from './components/Pack/packs';
import packageReducer from './reducers/package';
import * as PackageActions from './actions/PackageActions';
const store = createStore(packageReducer);

const createPackage = (value) => store.dispatch({type: 'CREATE_PACKAGE', isCreating: value});

store.subscribe(() => {
  console.log(store.getState());
});

export default React => () => {
	const Packs  = CreatePacks(React);
  const packsProps = {
    actions: {
      ...PackageActions
    }
  };

  return (
			<div className="content">
				<Packs {...packsProps}/>
			</div>
  );
};

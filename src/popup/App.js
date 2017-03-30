import { createStore } from 'redux';
import CreatePackage from './components/Pack/CreatePackage';
import CreatePacks from './components/Pack/packs';
import packageReducer from './reducers/package';
import * as PackageActions from './actions/PackageActions';
const store = createStore(packageReducer);

store.subscribe(() => {
  console.log(store.getState());
});

export default React => () => {
	const Packs  = CreatePacks(React);
  const packsProps = {
    store,
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

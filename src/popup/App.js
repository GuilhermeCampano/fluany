import { createStore } from 'redux';
import CreatePackage from './components/CreatePackage';
import packageReducer from './reducers/package';
const store = createStore(packageReducer);

const createPackage = (isCreating) => store.dispatch({type: 'CREATE_PACKAGE', isCreating});

store.subscribe(() => {
  console.log(store.getState());
});

export default React => ({ title, ...props}) => {
  const Create = CreatePackage(React);
  const createPackageProps = {
    actions: {
			...props,
      createPackage
    }
  };

  return (
			<div className="content">
				<Create { ...createPackageProps } />
			</div>
  );
};

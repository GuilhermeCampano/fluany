import CreatePackage from './CreatePackage';
import CreatePackItem from './PackItem.js';

export default React => {
  const packs = ({store, actions: {createPackage}}) => {
		const Create = CreatePackage(React);
    const PackItem = CreatePackItem(React);
		const createProps = {
      store,
      isCreating: false,
			actions: {
				createPackage
			}
		};

    return (
		 <section>
				<ul className="packs-content">
					  <Create {...createProps}/>
            <PackItem {...createProps}/>
				</ul>
			</section>
    );
  };

  return packs;
};

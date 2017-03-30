import CreatePackage from './CreatePackage';


export default React => {
  const packs = ({store, actions: {createPackage}}) => {
		const Create = CreatePackage(React);
		const createProps = {
      store,
			actions: {
				createPackage
			}
		};

    return (
		 <section>
				<ul className="packs-content">
					<Create {...createProps}/>
				</ul>
			</section>
    );
  };

  return packs;
};

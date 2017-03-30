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
				<ul>
					<li>Pack1</li>
					<Create {...createProps}/>
				</ul>
			</section>
    );
  };

  return packs;
};

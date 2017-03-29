import CreatePackage from './CreatePackage';


export default React => {
  const packs = ({ actions: {createPackage}}) => {
		const Create = CreatePackage(React);
		const createProps = {
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

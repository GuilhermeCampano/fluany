export default React => {

  const {
    string, shape, func
  } = React.PropTypes;

  const pack = ({store, actions: { createPackage } }) => {
    const handleClickItem = () => store.dispatch({type: 'CREATE_PACKAGE', value: {isCreating: true}})
    return (
        <li key="add" className="pack-item pack-item--new" onClick={handleClickItem}>
					<p className="create-package--icon">+</p>
					<p className="create-package--description">Criar novo pacote</p>
        </li>
    );
  };

  pack.propTypes = {
    actions: shape({
      createPackage: func.isRequired
    })
  };

  return pack;
};

export default React => {

  const {
    string, shape, func
  } = React.PropTypes;

  const additing = () => (
    <div><p>Adicionando...</p></div>
  );

  const pack = ({store, actions: { createPackage }, isCreating }) => {
    const handleClickItem = () => {
        store.dispatch({type: 'CREATE_PACKAGE', value: {isCreating: true}});
    };
    const Create = isCreating ? additing() : "";

    return (
        <li key="add" className="pack-item pack-item--new" onClick={handleClickItem}>
					<p className="create-package--icon">+</p>
					<p className="create-package--description">Adicionar novo pacote</p>
            {Create}
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

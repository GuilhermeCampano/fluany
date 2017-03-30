export default React => {

  const {
    string, shape, func
  } = React.PropTypes;

  const pack = ({store, actions: { createPackage } }) => {
    const handleClickItem = () => store.dispatch({type: 'CREATE_PACKAGE', value: {isCreating: true}})
    return (
        <li key="add" onClick={handleClickItem}>
					<p>+</p>
					<p>Criar novo pacote</p>
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

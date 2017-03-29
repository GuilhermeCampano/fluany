export default React => {

  const {
    string, shape, func
  } = React.PropTypes;

  const pack = ({ actions: { createPackage } }) => {
    return (
        <li key="add" onClick={ () => createPackage({isCreating: true}) }>
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

export default React => {

  const {
    string, shape, func
  } = React.PropTypes;

  const pack = ({ actions: { addPackage } }) => {
    return (
				<p  onClick={ () => addPackage([{name: 'Package3'}]) }>Add package!</p>
    );
  };

  pack.propTypes = {
    actions: shape({
      addPackage: func.isRequired
    })
  };

  return pack;
};

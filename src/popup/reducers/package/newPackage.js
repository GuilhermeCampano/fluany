const assign = Object.assign;

export default (
  state = { isCreating: false }, {isCreating, type } = {}
) => {

  switch (type) {
		case 'CREATE_PACKAGE':
			return assign({}, state, isCreating);
		default:
			return state;
  }
};

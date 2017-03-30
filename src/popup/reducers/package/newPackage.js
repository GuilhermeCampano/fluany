const assign = Object.assign;

export default (
  state = { isCreating: false }, {type, value } = {}
) => {

  switch (type) {
		case 'CREATE_PACKAGE':
			return assign({}, state, value);
		default:
			return state;
  }
};

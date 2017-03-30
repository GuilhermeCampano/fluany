export default (state = [{name: 'Package1'}], {type, value} = {}) => {

	switch (type) {
	case 'ADD_PACKAGE':
		return [...state, value];
	default:
		return state;
	}

};

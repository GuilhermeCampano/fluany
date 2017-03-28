const assign = Object.assign;

export default (state = [{name: 'Package1'}], {type, pckg} = {}) => {

	switch (type) {
		case 'ADD_PACKAGE':
		return [...state, ...pckg];
		default:
			return state;
	}

};

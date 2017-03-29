import { ADD_PACKAGE, CREATE_PACKAGE } from '../constants/ActionTypes';

export function addPackage(){
	return {
		type: ADD_PACKAGE
	};
}
export function createPackage(){
	return {
		type: CREATE_PACKAGE
	};
}

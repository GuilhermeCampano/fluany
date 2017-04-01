import {ADD_PACKAGE,
        IS_CREATING_PACKAGE } from '../constants/ActionTypes';

export function addPackage(value){
	  return {
		    type: ADD_PACKAGE,
        value
	  };
}

export function isCreatingPackage(value){
	  return {
		    type: IS_CREATING_PACKAGE,
        value
	  };
}

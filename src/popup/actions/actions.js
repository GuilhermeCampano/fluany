import {ADD_PACKAGE,
        IS_CREATING_PACKAGE,
        IS_EDIT_PACKAGE_TITLE,
        EDIT_PACKAGE_TITLE} from '../constants/ActionTypes';

export function addPackage(value){
	  return {
		    type: ADD_PACKAGE,
        value
	  };
}

export function isCreatingPackage(value){
    console.log('value: ', value);
	  return {
		    type: IS_CREATING_PACKAGE,
        value
	  };
}

export function editTitlePackage(value){
    return {
        type: EDIT_PACKAGE_TITLE,
        value
    };
}

export function isEditTitlePackage(value){
    return {
        type: IS_EDIT_PACKAGE_TITLE,
        value
    };
}

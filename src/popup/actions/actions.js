import { ADD_PACKAGE,
         IS_CREATING_PACKAGE,
         CHANGE_PACKAGE_TITLE,
         CHANGE_PACKAGE_DESCRIPTION,
         CHANGE_FILTER_PACKAGE,
         TOGGLE_ACTIVE_SEARCH,
         CHANGE_PAGINATION_PACKAGE,
         MORE_PACKAGE,
         CHANGE_PACKAGE_COLORID,
         IS_CHANGING_COLOR,
				 IS_EDIT_PACKAGE,
         NEW_PACKAGE,
				 CHANGE_TIME_PACKAGE } from '../constants/ActionTypes';

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

export function changePackageTitle(id, value){
    return {
        type: CHANGE_PACKAGE_TITLE,
        value,
        id
    };
}

export function changePackageDescription(id, value){
    return {
        type: CHANGE_PACKAGE_DESCRIPTION,
        value,
        id
    };
}

export function changeFilterPackage(value){
    return {
        type: CHANGE_FILTER_PACKAGE,
        value
    };
}

export function toggleActiveSearch(){
    return {
        type: TOGGLE_ACTIVE_SEARCH
    };
}

export function changePagination(){
    return {
        type: CHANGE_PAGINATION_PACKAGE
    };
};

export function changeColorID(value, id){
    return {
        type: CHANGE_PACKAGE_COLORID,
        value,
        id
    };
}

export function isChangingColor(value, id){
    return {
        type: IS_CHANGING_COLOR,
        value,
        id
    };
}

export function isEditPackage(value){
	return {
		type: IS_EDIT_PACKAGE,
		value
	};
}

export function newPackage(value){
    return {
        type: NEW_PACKAGE,
        value
    };
}

export function changeTimePackage(value, id){
	return {
		type: CHANGE_TIME_PACKAGE,
		value,
		id
	};
}

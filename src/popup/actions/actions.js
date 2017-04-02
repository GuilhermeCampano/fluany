import { ADD_PACKAGE,
         IS_CREATING_PACKAGE,
         CHANGE_PACKAGE_TITLE,
         CHANGE_PACKAGE_DESCRIPTION,
         CHANGE_FILTER_PACKAGE,
         TOGGLE_ACTIVE_SEARCH} from '../constants/ActionTypes';

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

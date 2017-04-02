import {IS_CREATING_PACKAGE,
        IS_EDIT_PACKAGE_TITLE} from '../constants/ActionTypes';
const assign = Object.assign;

let defaultState = {
    isCreatingPackage: false,
    isEditTitlePackage: false
}

const flags = (state = defaultState, action) => {
    switch(action.type){
    case IS_CREATING_PACKAGE:
			  return assign({}, state, {isCreatingPackage: action.value});
    case IS_EDIT_PACKAGE_TITLE:
        return assign({}, state, {isEditTitlePackage: action.value});
    default:
        return state;
    }
};

export default flags;

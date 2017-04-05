import { toLower } from 'ramda';
import { IS_CREATING_PACKAGE,
         CHANGE_FILTER_PACKAGE,
         TOGGLE_ACTIVE_SEARCH,
				 IS_EDIT_PACKAGE,
         CHANGE_PAGINATION_PACKAGE,
         NEW_PACKAGE } from '../constants/ActionTypes';

const assign = Object.assign;

let defaultState = {
    isCreatingPackage: false,
    filterPackage: "",
    isActiveSearch: false,
		paginationPackage: 3,
		isEditPackage: false,
    newPackage: {title: "", description: ""}
};

const flags = (state = defaultState, action) => {
    switch(action.type){
        case IS_CREATING_PACKAGE:
            return assign({}, state, {isCreatingPackage: action.value});
        case CHANGE_FILTER_PACKAGE:
            return assign({}, state, {filterPackage: toLower(action.value)});
        case TOGGLE_ACTIVE_SEARCH:
            return assign({}, state, {isActiveSearch: !state.isActiveSearch});
        case CHANGE_PAGINATION_PACKAGE:
            return assign({}, state, {paginationPackage: state.paginationPackage + 2});
				case IS_EDIT_PACKAGE:
            return assign({}, state, {isEditPackage: action.value});
        case NEW_PACKAGE:
            return assign({}, state, {newPackage: action.value});
        default:
            return state;
    }
};

export default flags;

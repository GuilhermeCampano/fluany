import { IS_CREATING_PACKAGE,
         CHANGE_FILTER_PACKAGE,
         TOGGLE_ACTIVE_SEARCH } from '../constants/ActionTypes';
import { toLower } from 'ramda';

const assign = Object.assign;

let defaultState = {
    isCreatingPackage: false,
    filterPackage: "",
    isActiveSearch: false
}

const flags = (state = defaultState, action) => {
    switch(action.type){
        case IS_CREATING_PACKAGE:
            return assign({}, state, {isCreatingPackage: action.value});
        case CHANGE_FILTER_PACKAGE:
            return assign({}, state, {filterPackage: toLower(action.value)});
        case TOGGLE_ACTIVE_SEARCH:
            return assign({}, state, {isActiveSearch: !state.isActiveSearch});
        default:
            return state;
    }
};

export default flags;

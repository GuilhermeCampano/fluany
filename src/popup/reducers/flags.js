import {IS_CREATING_PACKAGE} from '../constants/ActionTypes';
const assign = Object.assign;

const flags = (state = {isCreatingPackage: false}, action) => {
    switch(action.type){
    case IS_CREATING_PACKAGE:
			  return assign({}, state, {isCreatingPackage: action.value});
    default:
        return state;
    }
};

export default flags;

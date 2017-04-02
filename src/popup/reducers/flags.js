import { IS_CREATING_PACKAGE } from '../constants/ActionTypes';
const assign = Object.assign;

let defaultState = {
    isCreatingPackage: false
}

const flags = (state = defaultState, action) => {
    switch(action.type){
    case IS_CREATING_PACKAGE:
			  return assign({}, state, {isCreatingPackage: action.value});
    default:
        return state;
    }
};

export default flags;

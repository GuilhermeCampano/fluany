import {ADD_PACKAGE} from '../constants/ActionTypes';

const pack = (state = [{name: 'pack01', description: 'Mauris mollis tincidunt felis.'}], action) => {
    switch(action.type){
        case ADD_PACKAGE:
            return [...state, action.value];
        default:
            return state;
    }
};

export default pack;

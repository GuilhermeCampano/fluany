import { ADD_PACKAGE,
         CHANGE_PACKAGE_TITLE,
         CHANGE_PACKAGE_DESCRIPTION } from '../constants/ActionTypes';
import { assoc, update } from 'ramda';

let defaultState = [
  {
    id: 0,
    title: 'Pack teste numero 1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sithendrerit ultrices'
  },
{
    id: 1,
    title: 'Pack teste numero 2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sithendrerit ultrices'
}
];

const packs = (state = defaultState, action) => {
    switch(action.type){
        case ADD_PACKAGE:
            return [...state, action.value];
        case CHANGE_PACKAGE_TITLE:
            return update(action.id, assoc('title', action.value, state[action.id]), state);
        case CHANGE_PACKAGE_DESCRIPTION:
            return update(action.id, assoc('description', action.value, state[action.id]), state);
        default:
            return state;
    }
};

export default packs;

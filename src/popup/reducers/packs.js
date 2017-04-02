import { ADD_PACKAGE } from '../constants/ActionTypes';
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
        default:
            return state;
    }
};

export default packs;

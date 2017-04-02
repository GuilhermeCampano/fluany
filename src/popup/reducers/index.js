import { combineReducers } from 'redux';
import packs from './packs';
import flags from './flags';

const app = combineReducers({
    packs,
    flags
});

export default app;

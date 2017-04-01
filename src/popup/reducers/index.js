import { combineReducers } from 'redux';
import pack from './pack';
import flags from './flags';

const app = combineReducers({
    pack,
    flags
});

export default app;

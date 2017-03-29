import { combineReducers } from 'redux';
import pack from './pack';
import newPackage from './newPackage';

export default combineReducers({
	pack,
	newPackage
});

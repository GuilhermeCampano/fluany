import {putStorage} from '../../src/shared/helpers';
import {assert} from 'chai';

describe('Helpers function', () =>{
	let a = 1 + 2;
	it('Put Storage', () => {
		assert.typeOf(a, 'number');
	});
});

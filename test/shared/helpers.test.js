import {getProperty} from '../../src/shared/helpers';
import {expect} from 'chai';

describe('Helper functions', () =>{
	  let user = {
        name: "Victor Igor",
        age: 19,
        skills: {
            label: "Frontend",
            value: 0
        }
    };
    it('getProperty', () => {
        expect(getProperty(user, "skills.label")).to.exist;
    });
});

import React from 'react';
import InputInterval from '../../src/popup/components/InputInterval/InputInterval';
describe('InputInterval', () => {
    const wrapper = shallow(<InputInterval/>);
    it('should render InputRange', () => {
       expect(wrapper.find('InputRange')).to.have.length(1);
    });

    it('should change value when to call', () => {
        let value = 'change here';
        wrapper.instance().handleValueChange('', value);
        expect(wrapper.state().value).to.equal(value);
    });
});

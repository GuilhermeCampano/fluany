import React from 'react';
import ButtonStart from '../../src/popup/components/ButtonStart/ButtonStart';
describe('ButtonStart', () => {
    const wrapper = shallow(<ButtonStart/>);

    it('should render a with play text', () => {
        expect(wrapper.find('a').text()).to.equal('Play');
    });

    it('should change play bool state when to click', () => {
        const button = wrapper.find('a');
        button.simulate('click');
        expect(wrapper.state().play).to.equal(false);
    });

});

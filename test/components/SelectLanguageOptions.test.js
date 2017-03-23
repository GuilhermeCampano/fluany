import React from 'react';
import SelectLanguageOptions from '../../src/popup/components/SelectLanguageOptions/SelectLanguageOptions';

describe('SelectLanguageOptions', () => {
    const wrapper = shallow(<SelectLanguageOptions />);
    const select = mount(<SelectLanguageOptions/>);

    it('should have Dropdown component', () => {
        expect(wrapper.find('Dropdown')).to.have.length(1);
    });

    it('should have ButtonStart component', () => {
        expect(wrapper.find('ButtonStart')).to.have.length(1);
    });

    it('should render dropdown-control in Dropdown component', () => {
        expect(select.find('.Dropdown-control')).to.have.length(1);
    });
});

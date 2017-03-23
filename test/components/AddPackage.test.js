import React from 'react';
import AddPackage from '../../src/popup/components/AddPackage/AddPackage';

describe('Add Package', () => {
    const wrapper = shallow(<AddPackage/>);

    it('should have button', () => {
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('should have true in addingPackage when click button', () => {
        const button = wrapper.find('button');
        button.simulate('click');
        expect(wrapper.state().addingPackage).to.equal(true);
    });

    it('should render form when addinPackage is true', () => {
        expect(wrapper.find('form')).to.have.length(1);
    });

    it('should render input to package name', () => {
        expect(wrapper.find('input')).to.have.length(1);
    });

    it('should render button to create a package', () => {
        expect(wrapper.find('button')).to.have.length(1);
    });

    it('should change requirePackageName to true when to click with package name empty', () => {
        const button = wrapper.find('button');
        button.simulate('click', {preventDefault(){}});
        expect(wrapper.state().requirePackageName).to.equal(true);
    });

    it('should change packageName\'s state when put data', () => {
        const input = wrapper.find('input');
        input.simulate('change', {target: {value: "   change here   "}});
        expect(wrapper.state().packageName).to.equal('change here');
    });

});

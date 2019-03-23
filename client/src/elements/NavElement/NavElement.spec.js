import React from 'react';
import NavElement from '.';

describe('Elements', () => {
    describe('NavElement', () => {
        it('should match snapshot', () => {
            const wrapper = shallow(<NavElement to="/">Home</NavElement>);
            expect(wrapper).toMatchSnapshot();
        });

        it('should match snapshot as active menu item', () => {
            const wrapper = shallow(<NavElement nav to="/">Home</NavElement>);
            expect(wrapper).toMatchSnapshot();
        });
    });
});

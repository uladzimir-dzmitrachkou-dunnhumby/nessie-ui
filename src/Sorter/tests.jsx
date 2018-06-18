/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/


import React        from 'react';
import { mount }    from 'enzyme';

import Sorter       from './index';

describe( 'Sorter', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount( <Sorter /> );
    });


    test('should render <Sorter/>', () =>
    {
        expect( wrapper.find( Sorter ) ).toHaveLength(1);
    });

    test('should have its component name and hash as default className', () =>
    {
        expect( wrapper.find( '.sorter__default' ) ).toHaveLength(1);
    });
} );

describe( 'SorterDriver', () =>
{
    let wrapper;

    beforeEach(() =>
    {
        wrapper = mount( <Sorter /> );
    });

    test('should call onToggle callback function', () =>
    {
        const onToggle = sinon.spy();
        wrapper.setProps( {
            onToggle
        } );

        wrapper.driver().toggle();

        expect( onToggle.calledOnce ).toBe(true);
    });
} );

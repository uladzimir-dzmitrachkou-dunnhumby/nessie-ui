/* eslint-env node, mocha */
/* eslint no-console: 0 */
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */

import React        from 'react';
import { mount }    from 'enzyme';

import { Required } from '../index';

describe( 'Required', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper  = mount( <Required /> );
    } );

    describe( 'render()', () =>
    {
        test( 'should contain exactly one Required', () =>
        {
            expect( wrapper ).toHaveLength( 1 );
        } );
    } );

    describe( 'props', () =>
    {
        describe( 'isRequired', () =>
        {
            test( 'should be "true" by default', () =>
            {
                expect( wrapper.prop( 'isRequired' ) ).toBeTruthy();
            } );
        } );
    } );
} );

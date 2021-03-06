/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* eslint-disable no-magic-numbers */

import React                from 'react';
import { mount }            from 'enzyme';

import { IconButton, Tag }  from '../index';

describe( 'Tag', () =>
{
    let wrapper;

    beforeEach( () =>
    {
        wrapper = mount( <Tag /> );
    } );

    test( 'should render <Tag/>', () =>
    {
        expect( wrapper.find( Tag ) ).toHaveLength( 1 );
    } );

    test( 'should have its component name as default className', () =>
    {
        expect( wrapper.find( `.${wrapper.prop( 'cssMap' ).default}` ).first() )
            .toHaveLength( 1 );
    } );

    test( 'should have an IconButton as a child', () =>
    {
        expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
    } );

    describe( 'read-only state', () =>
    {
        beforeEach( () =>
        {
            wrapper = mount( <Tag isReadOnly /> );
        } );

        test( 'should have an IconButton as a child with isReadOnly set', () =>
        {
            expect( wrapper.find( IconButton ) ).toHaveLength( 1 );
            expect( wrapper.find( IconButton ).prop( 'isReadOnly' ) )
                .toBeTruthy();
        } );
    } );

    test( 'should have an IconButton with control theme and close icon as a \
child', () =>
    {
        expect( wrapper.find( IconButton ).props().iconTheme )
            .toBe( 'control' );
        expect( wrapper.find( IconButton ).props().iconType ).toBe( 'close' );
    } );

    test( 'should have a string as a label when prop label is passed', () =>
    {
        const label = 'Tag Label';
        const props = {
            label,
        };
        wrapper = mount( <Tag { ...props } /> );
        expect( wrapper.text() ).toBe( label );
    } );

    test( 'should trigger onClick callbacks when IconButton clicked', () =>
    {
        const callBack = jest.fn();
        const props = {
            onClick : callBack,
        };
        wrapper = mount( <Tag { ...props } /> );
        wrapper.driver().clickClose();
        expect( callBack ).toBeCalled();
    } );
} );

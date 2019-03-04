import React            from 'react';
import { render }       from 'react-testing-library';
import 'jest-dom/extend-expect';

import { IconButton }   from '..';


describe( 'snapshot tests', () =>
{
    test( 'should render IconButton with default props', () =>
    {
        const wrapper = render( <IconButton id = "first" /> );
        // wrapper.debug();
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'should render IconButton with disabled styles', () =>
    {
        const wrapper = render( <IconButton id = "second" isDisabled /> );
        // wrapper.debug();
        expect( wrapper ).toMatchSnapshot();
    } );
} );

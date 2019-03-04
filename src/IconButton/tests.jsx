import React            from 'react';
import { render }       from 'react-testing-library';
import 'jest-dom/extend-expect';

import { IconButton }   from '..';

test( 'should render IconButton with default props', () =>
{
    const wrapper = render( <IconButton id = "1" /> );
    wrapper.debug();
    expect( wrapper ).toMatchSnapshot();
} );

test( 'should render IconButton with disabled styles', () =>
{
    const wrapper = render( <IconButton id = "2" isDisabled /> );
    wrapper.debug();
    expect( wrapper ).toMatchSnapshot();
} );

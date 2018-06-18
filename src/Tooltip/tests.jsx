/* eslint-env node, mocha */
/* global expect */
/* eslint no-console: 0*/
/* eslint-disable no-magic-numbers, no-multi-str, no-unused-expressions */


import React     from 'react';
import { mount } from 'enzyme';

import Tooltip   from './index';


describe( 'Tooltip', () =>
{
    test('should fire onMouseOver event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        const Wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

        Wrapper.driver().mouseOver();

        expect( onMouseOverHandler.calledOnce ).toBe(true);
        expect( onMouseOutHandler.notCalled ).toBe(true);
    });

    test('should fire onMouseOut event', () =>
    {
        const onMouseOverHandler = sinon.spy();
        const onMouseOutHandler = sinon.spy();
        const props = {
            message     : 'Pikachu!',
            onMouseOver : onMouseOverHandler,
            onMouseOut  : onMouseOutHandler
        };

        const wrapper = mount( <Tooltip { ...props }>
            <h2> Who am I?</h2>
        </Tooltip> );

        wrapper.driver().mouseOut();

        expect( onMouseOverHandler.notCalled ).toBe(true);
        expect( onMouseOutHandler.calledOnce ).toBe(true);
    });

    describe( 'Driver self-test', () =>
    {
        test('getContent', () =>
        {
            const props = {
                message : 'Pikachu!',
            };

            const wrapper = mount( <Tooltip { ...props } >
                <h1>Who am i?</h1>
            </Tooltip> );

            const content = wrapper.driver().getContent();
            expect( content.find( 'h1' ) ).toHaveLength(1);
        });

        test('getMessage', () =>
        {
            const props = {
                message : <h2>Pikachu!</h2>,
            };

            const wrapper = mount( <Tooltip { ...props } /> );

            const message = wrapper.driver().getMessage();
            expect( message.find( 'h2' ) ).toHaveLength(1);
        });
    } );
} );

import React            from 'react';
import { render }       from 'react-testing-library';
import 'jest-dom/extend-expect';

import { Tab, Tabs }    from '..';


describe( 'snapshot tests', () =>
{
    test( 'should render Tabs with default props', () =>
    {
        const wrapper = render(
            <Tabs id = "first">
                <Tab label = "English">hello!</Tab>
                <Tab label = "Español">hola!</Tab>
                <Tab label = "Русский">привет!</Tab>
            </Tabs>,
        );

        // wrapper.debug();
        expect( wrapper ).toMatchSnapshot();
    } );

    test( 'should render Tabs with disabled styles', () =>
    {
        const wrapper = render(
            <Tabs id = "second">
                <Tab label = "English">hello!</Tab>
                <Tab label = "Español">hola!</Tab>
                <Tab label = "Русский">привет!</Tab>
            </Tabs>,
        );
        // wrapper.debug();
        expect( wrapper ).toMatchSnapshot();
    } );
} );

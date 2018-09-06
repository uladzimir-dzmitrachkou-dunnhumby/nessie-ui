/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                          from 'react';
import PropTypes                      from 'prop-types';

import { generateId, buildClassName } from '../utils';
import styles                         from './tab.css';

const Tab = ( {
    children,
    className,
    cssMap,
    id = generateId( 'Tab' ),
    label,
    onClick,
} ) => (
    <div
        className  = { buildClassName( className, cssMap ) }
        onClick    = { onClick }
        aria-label = { label }
        id         = { id }
        role       = "tabpanel">
        { children }
    </div>
);

Tab.propTypes =
{
    /**
     * Section content
     */
    children  : PropTypes.node,
    /**
     * Extra CSS class name
     */
    className : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * HTML id attribute
     */
    id        : PropTypes.string,
    /**
    *  Label to show in TabButton of this tab
    */
    label     : PropTypes.string,
    /**
    *  onClick callback function: ( e ) => { ... }
    */
    onClick   : PropTypes.func,
};

Tab.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : styles,
    id        : undefined,
    label     : undefined,
    onClick   : undefined,
};

export default Tab;

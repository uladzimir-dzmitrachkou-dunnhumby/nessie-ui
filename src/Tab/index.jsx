/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React            from 'react';
import PropTypes        from 'prop-types';

import { useTheme }     from '../utils';


const componentName = 'Tab';

const Tab = ( props ) =>
{
    const [ cssMap ] = useTheme( componentName, props );
    const {
        children,
        label,
    } = props;

    return (
        <div
            className  = { cssMap.main }
            aria-label = { label }
            role       = "tabpanel">
            { children }
        </div>
    );
};

Tab.propTypes =
{
    /**
     *  Section content
     */
    children  : PropTypes.node,
    /**
     * Extra CSS classname
     */
    className : PropTypes.string,
    /**
     * CSS classname map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Label to show in TabButton of this tab
     */
    label     : PropTypes.string,
};

Tab.defaultProps =
{
    children  : undefined,
    className : undefined,
    cssMap    : undefined,
    label     : undefined,
};

Tab.displayName = componentName;

export default Tab;

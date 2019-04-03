/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { IconButton, Text } from '..';

import { useId, useTheme }  from '../utils';


const componentName = 'Tag';

const Tag = props =>
{
    const {
        children,
        isDisabled,
        isReadOnly,
        label,
        onClick,
    } = props;

    const [ cssMap ] = useTheme( componentName, props );
    const id = useId( componentName, props );

    let labelText = children || label;

    if ( typeof labelText === 'string' )
    {
        labelText = (
            <Text className = { cssMap.label } overflowIsHidden>
                { labelText }
            </Text>
        );
    }

    return (
        <div className = { cssMap.main }>
            { labelText }
            <IconButton
                className  = { cssMap.delete }
                iconSize   = "S"
                iconType   = "x"
                isDisabled = { isDisabled }
                isReadOnly = { isReadOnly }
                onClick    = { () =>
                    onClick && onClick( { id } )
                } />
        </div>
    );
};

Tag.propTypes =
{
    /**
     *  Tag label (JSX node; overrides label prop)
     */
    children   : PropTypes.node,
    /**
     *  CSS class name
     */
    className  : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap     : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Component id
     */
    id         : PropTypes.string,
    /**
     *  Display as disabled
     */
    isDisabled : PropTypes.bool,
    /**
     *  Display as read-only
     */
    isReadOnly : PropTypes.bool,
    /**
     *  Tag label (string)
     */
    label      : PropTypes.string,
    /**
     *   onClick callback function for delete icon
     */
    onClick    : PropTypes.func,
};

Tag.defaultProps =
{
    children   : undefined,
    className  : undefined,
    cssMap     : undefined,
    id         : undefined,
    isDisabled : false,
    isReadOnly : false,
    label      : undefined,
    onClick    : undefined,
};

Tag.displayName = componentName;

export default Tag;

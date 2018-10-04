/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React              from 'react';
import PropTypes          from 'prop-types';

import { buildClassName } from '../utils';
import styles             from './row.css';

const Row = ( {
    align,
    children,
    className,
    cssMap,
    gutters,
    hasDividers,
    hasWrap,
    onClick,
    onMouseOut,
    onMouseOver,
    role,
    spacing,
    verticalAlign,
} ) =>
{
    let elements;

    if ( hasDividers )
    {
        elements = React.Children.toArray( children ).flatMap( (
            child,
            index,
            { length },
        ) =>
            ( index < length - 1 ?
                [ child, <div className = { cssMap.divider } /> ] : child ) );
    }

    return (
        <div
            className = { buildClassName( className, cssMap, {
                alignX  : align,
                alignY  : verticalAlign,
                gutters : gutters !== 'none' && gutters,
                wrap    : hasWrap,
                spacing : spacing !== 'none' && spacing,
            } ) }
            hasWrap      = { false }
            onClick      = { onClick }
            onMouseEnter = { onMouseOver }
            onMouseLeave = { onMouseOut }
            role         = { role && role !== 'none' ? role : null }>
            { hasDividers ? elements : children }
        </div>
    );
};

Row.propTypes =
{
    /**
     *  Horizontal alignment of the columns (“auto” makes all columns equal
     *  width)
     */
    align         : PropTypes.oneOf( [ 'auto', 'left', 'center', 'right' ] ),
    /**
     *  Grid content (Columns)
     */
    children      : PropTypes.node,
    /**
     *  CSS class name
     */
    className     : PropTypes.string,
    /**
     *  CSS class map
     */
    cssMap        : PropTypes.objectOf( PropTypes.string ),
    /**
     *  Gutter size
     */
    gutters       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Adds dividers between row items
     */
    hasDividers   : PropTypes.bool,
    /**
     *  Wrap content
     */
    hasWrap       : PropTypes.bool,
    /**
     *  onClick callback function:
     *  ( e ) => { ... }
     */
    onClick       : PropTypes.func,
    /**
     *  onMouseOut callback function:
     *  ( e ) => { ... }
     */
    onMouseOut    : PropTypes.func,
    /**
     *  onMouseOver callback function:
     *  ( e ) => { ... }
     */
    onMouseOver   : PropTypes.func,
    /**
     *  Grid role
     */
    role          : PropTypes.string,
    /**
     *  Row spacing
     */
    spacing       : PropTypes.oneOf( [ 'none', 'S', 'M', 'L' ] ),
    /**
     *  Vertical alignment of the columns (“auto” makes all columns equal
     *  height)
     */
    verticalAlign : PropTypes.oneOf( [ 'auto', 'top', 'middle', 'bottom' ] ),
};

Row.defaultProps =
{
    align         : 'auto',
    children      : undefined,
    className     : undefined,
    cssMap        : styles,
    gutters       : 'M',
    hasDividers   : false,
    onClick       : undefined,
    onMouseOut    : undefined,
    onMouseOver   : undefined,
    role          : undefined,
    spacing       : 'M',
    verticalAlign : 'auto',
};

export default Row;

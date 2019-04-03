/*
 * Copyright (c) 2018-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                      from 'react';
import PropTypes                  from 'prop-types';

import { attachEvents, useTheme } from '../utils';


const componentName = 'GridItem';

const GridItem = props =>
{
    const {
        children,
        colSpan,
        rowSpan,
    } = props;

    const [ cssMap ] = useTheme( componentName, props );

    return (
        <div
            { ...attachEvents( props ) }
            className = { cssMap.main }
            style     = { {
                gridColumn : `span ${colSpan}`,
                gridRow    : `span ${rowSpan}`,
            } }>
            { children }
        </div>
    );
};

GridItem.propTypes =
{
    /**
     * Vertical alignment of the GridItem content
     */
    align : PropTypes.oneOf( [
        'start',
        'center',
        'end',
        'stretch',
    ] ),
    /**
     *  GridItem content
     */
    children  : PropTypes.node,
    /**
     *  CSS class name
     */
    className : PropTypes.string,
    /**
     *  GridItem column span - should be an integer > 0
     */
    colSpan   : PropTypes.number,
    /**
     *  CSS class map
     */
    cssMap    : PropTypes.objectOf( PropTypes.string ),
    /**
     * Horizontal alignment of the GridItem content
     */
    justify   : PropTypes.oneOf( [ 'start', 'center', 'end', 'stretch' ] ),
    /**
     * GridItem row span - should be an integer > 0
     */
    rowSpan   : PropTypes.number,
};

GridItem.defaultProps =
{
    align     : 'start',
    children  : undefined,
    className : undefined,
    colSpan   : undefined,
    cssMap    : undefined,
    justify   : 'start',
    rowSpan   : undefined,
};

GridItem.displayName = componentName;

export default GridItem;

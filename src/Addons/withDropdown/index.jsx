/*
 * Copyright (c) 2017-2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                              from 'react';
import PropTypes                          from 'prop-types';

import { Dropdown }                       from '../..';
import { attachEvents, buildDisplayName } from '../../utils';
import ThemeContext                       from '../../Theming/ThemeContext';
import { createCssMap }                   from '../../Theming';


const withDropdown = Component =>
{
    class ComponentWithDropdown extends React.Component
    {
        static contextType = ThemeContext;

        static propTypes = {
            ...Component.propTypes,
            /**
             *  Show/hide the dropdown
             */
            dropdownIsOpen   : PropTypes.bool,
            /**
             *  Position of dropdown relative to component
             */
            dropdownPosition : PropTypes.oneOf( [ 'bottom', 'top' ] ),
            /**
             *  Props to pass directly to the Dropdown component
             */
            dropdownProps    : PropTypes.objectOf( PropTypes.any ),
            /**
             *  Ref object to receive a ref to the outer wrapper div
             */
            wrapperRef       : PropTypes.object,
        };

        static defaultProps = {
            ...Component.defaultProps,
            dropdownIsOpen   : false,
            dropdownPosition : 'bottom',
            dropdownProps    : undefined,
            wrapperRef       : undefined,
        };

        render()
        {
            const {
                cssMap = createCssMap( this.context.withDropdown, this.props ),
                dropdownIsOpen,
                dropdownPosition,
                dropdownProps,
                wrapperRef,
                ...componentProps
            } = this.props;

            return (
                <div
                    { ...attachEvents( this.props ) }
                    className = { cssMap.main }
                    ref       = { wrapperRef }>
                    <Component { ...componentProps } />
                    <Dropdown
                        { ...dropdownProps }
                        className = { cssMap.dropdown } />
                </div>
            );
        }
    }

    ComponentWithDropdown.displayName =
        buildDisplayName( ComponentWithDropdown, Component );

    return ComponentWithDropdown;
};

export default withDropdown;
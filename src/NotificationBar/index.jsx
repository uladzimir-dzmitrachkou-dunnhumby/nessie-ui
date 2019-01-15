/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                        from 'react';
import PropTypes                    from 'prop-types';

import { Icon, IconButton, Text }   from '../index';
import ThemeContext                 from '../Theming/ThemeContext';
import { createCssMap }             from '../Theming';

export default class NotificationBar extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Message text
         */
        message     : PropTypes.string,
        /**
         *  NotificationBar content
         */
        children    : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className   : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap      : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Message type
         */
        messageType : PropTypes.oneOf( [
            'alert',
            'error',
            'info',
            'success',
        ] ),
        /**
         *  Close button onClick callback function
         */
        onClickClose  : PropTypes.func,
        /**
         *  Message text
         */
        isDismissible : PropTypes.bool,
        /**
         *  Change position to fixed top in the viewport
         */
        isFixed       : PropTypes.bool,
    };

    static defaultProps =
    {
        children      : undefined,
        className     : undefined,
        cssMap        : undefined,
        isDismissible : true,
        isFixed       : false,
        message       : undefined,
        messageType   : 'info',
        onClickClose  : undefined,
    };

    static displayName = 'NotificationBar';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.NotificationBar, this.props ),
            isDismissible,
            message,
            onClickClose,
        } = this.props;

        return (
            <div
                className = { cssMap.main }>
                <Icon
                    className = { cssMap.icon }
                    type      = "info" />
                { ( children || message ) &&
                    <Text className = { cssMap.message }>
                        { children || message }
                    </Text>
                }
                { isDismissible &&
                    <IconButton
                        className = { cssMap.close }
                        iconType  = "close"
                        onClick   = { onClickClose }
                        role      = "inverted" />
                }
            </div>
        );
    }
}

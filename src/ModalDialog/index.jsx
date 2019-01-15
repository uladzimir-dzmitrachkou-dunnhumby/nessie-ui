/*
 * Copyright (c) 2017-2018 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

import React                from 'react';
import PropTypes            from 'prop-types';

import { IconButton }       from '../index';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';

export default class ModalDialog extends React.Component
{
    static contextType = ThemeContext;

    static propTypes =
    {
        /**
         *  Dialog Content
         */
        children  : PropTypes.node,
        /**
         *  Extra CSS class name
         */
        className : PropTypes.string,
        /**
         *  CSS class map
         */
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        /**
         *  Message type
         */
        type      : PropTypes.oneOf( [
            'default',
            'neutral',
            'crucial',
            'promoted',
            'carousel',
        ] ),
        /**
         *  Display the dialog
         */
        isVisible      : PropTypes.bool,
        /**
         *  Display a wider dialog (doesn’t apply to carousel)
         */
        isWide         : PropTypes.bool,
        /**
         *  Title displayed on carousel modal
         */
        title          : PropTypes.string,
        /**
         *  Show navigation buttons (only applies to carousel)
         */
        hasNavigation  : PropTypes.bool,
        /**
         *  Overlay onClick callback function
         */
        onClickOverlay : PropTypes.func,
        /**
         *  Function to call on “Previous” button click: ( e ) => { ... }
         */
        onClickPrev    : PropTypes.func,
        /**
         *  Function to call on “Next” button click: ( e ) => { ... }
         */
        onClickNext    : PropTypes.func,
        /**
         *  Function to call on “Close” button click: ( e ) => { ... }
         */
        onClickClose   : PropTypes.func,
    };

    static defaultProps =
    {
        children       : undefined,
        className      : undefined,
        cssMap         : undefined,
        hasNavigation  : true,
        isVisible      : false,
        isWide         : undefined,
        onClickClose   : undefined,
        onClickNext    : undefined,
        onClickOverlay : undefined,
        onClickPrev    : undefined,
        title          : undefined,
        type           : 'default',
    };

    static displayName = 'ModalDialog';

    render()
    {
        const {
            children,
            cssMap = createCssMap( this.context.ModalDialog, this.props ),
            isVisible,
            onClickClose,
            onClickNext,
            onClickOverlay,
            onClickPrev,
            title,
            type,
        } = this.props;

        if ( !isVisible )
        {
            return <div className = "modalContainer" />;
        }

        const handleOverlayClick = ( e ) =>
        {
            if ( e.target !== e.currentTarget ) return;

            if ( onClickOverlay )
            {
                onClickOverlay( e );
            }
        };

        const isCarousel = type === 'carousel';
        let modalUI      = null;

        if ( isCarousel )
        {
            modalUI = (
                <div className = "modalContainer">
                    <div className = { cssMap.header }>
                        <span className = { cssMap.title }>{ title }</span>
                        <IconButton
                            iconSize = "L"
                            iconType = "close"
                            onClick  = { onClickClose } />
                    </div>
                    <div className = { cssMap.navigation }>
                        <IconButton
                            hasBackground
                            iconSize  = "M"
                            iconType  = "arrow"
                            onClick   = { onClickPrev } />
                        <IconButton
                            hasBackground
                            iconSize = "M"
                            iconType = "arrow"
                            onClick  = { onClickNext } />
                    </div>
                </div>
            );
        }

        return (
            <div className = "modalContainer">
                <div
                    className = { cssMap.main }
                    onClick   = { handleOverlayClick } >
                    { modalUI }
                    <div className = { cssMap.content }>
                        { children }
                    </div>
                </div>
            </div>
        );
    }
}

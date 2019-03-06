/*
 * Copyright (c) 2019 dunnhumby Germany GmbH.
 * All rights reserved.
 *
 * This source code is licensed under the MIT license found in the LICENSE file
 * in the root directory of this source tree.
 *
 */

/* global document, addEventListener, removeEventListener */

import React, { useEffect, useRef, useState }     from 'react';
import ReactDOM                                   from 'react-dom';
import { Manager, Reference, Popper }             from 'react-popper';
import PropTypes                                  from 'prop-types';

const componentName = 'PopperWrapper';

const PopperWrapper = ( props ) =>
{
    const {
        children,
        container,
        isVisible,
        matchRefWidth,
        onClickOutside,
        popper,
        popperOffset,
        popperPosition,
    } = props;

    const referenceRef = useRef();
    const popperRef    = useRef();

    const [ update, setUpdate ] = useState( undefined );

    useEffect( () =>
    {
        if ( isVisible )
        {
            console.log( update );
            // update();

            if ( onClickOutside )
            {
                addEventListener( 'mousedown', handleClickOutSide, false );

                return () =>
                {
                    removeEventListener(
                        'mousedown',
                        handleClickOutSide,
                        false,
                    );
                };
            }
        }
    } );

    // useEffect( () =>
    // {
    //     if ( isVisible )
    //     {y
    //         update();
    //
    //         if ( onClickOutside )
    //         {
    //               addEventListener( 'mousedown', handleClickOutSide, false );
    //         }
    //     }
    //
    //     if ( isVisible && onClickOutside )
    //     {
    //         if ( isVisible )
    //         {
    //             if ( onClickOutside )
    //             {
    //                 removeEventListener(
    //                     'mousedown',
    //                     handleClickOutSide,
    //                     false,
    //                 );
    //
    //                 addEventListener(
    //                     'mousedown',
    //                     handleClickOutSide,
    //                     false,
    //                 );
    //             }
    //             else
    //             {
    //                 removeEventListener(
    //                     'mousedown',
    //                     handleClickOutSide,
    //                     false,
    //                 );
    //             }
    //         }
    //         else
    //         {
    //             removeEventListener(
    //                 'mousedown',
    //                 handleClickOutSide,
    //                 false,
    //             );
    //         }
    //     }
    //
    // }, [ isVisible, onClickOutside ] );


    const handleClickOutSide = ( e ) =>
    {
        if ( !( referenceRef.current.contains( e.target ) ||
                popperRef.current.contains( e.target ) ) )
        {
            props.onClickOutside();
        }
    };

    const offset = {
        'S'    : '8px',
        'M'    : '16px',
        'L'    : '24px',
        'XL'   : '32px',
        'none' : undefined,
    }[ popperOffset ];

    return (
        <Manager>
            <Reference
                innerRef  = { ( ref ) => referenceRef.current = ref } >
                { ( { ref } ) => (
                    <div ref = { ref }>
                        { children }
                    </div>
                ) }
            </Reference>
            { isVisible && ReactDOM.createPortal(
                <Popper
                    placement = { popperPosition }
                    innerRef  = { ( ref ) => popperRef.current = ref }
                    modifiers = { offset ? {
                        offset : {
                            offset : `0, ${offset}`,
                        },
                    } : offset }>
                    { ( { ref, style, scheduleUpdate } ) =>
                    {
                        // setUpdate( scheduleUpdate );

                        return (
                            <div
                                ref   = { ref }
                                style = { matchRefWidth ? {
                                    'width' : referenceRef.current
                                        .clientWidth,
                                    ...style,
                                } : style }>
                                { popper }
                            </div> );
                    } }
                </Popper>,
                document.getElementById( container ) || document.body,
            ) }
        </Manager>
    );
};


PopperWrapper.propTypes =
{
    /**
     *  Reference node to attach popper
     */
    children       : PropTypes.node,
    /**
     *  id of the DOM element used as container
     */
    container      : PropTypes.string,
    /**
     *  Show / Hide popper
     */
    isVisible      : PropTypes.bool,
    /**
     *  pop up width matches reference width
     */
    matchRefWidth  : PropTypes.bool,
    /**
     *  Click Outside callback: ( e ) => ...
     */
    onClickOutside : PropTypes.func,
    /**
     *  Popper content node
     */
    popper         : PropTypes.node,
    /**
     *  Popper offset
     */
    popperOffset   : PropTypes.oneOf( [ 'S', 'M', 'L', 'XL', 'none' ] ),
    /**
     *  Popper position
     */
    popperPosition : PropTypes.oneOf( [
        'auto',
        'auto-start',
        'auto-end',
        'top',
        'top-start',
        'top-end',
        'bottom',
        'bottom-start',
        'bottom-end',
        'left',
        'left-start',
        'left-end',
        'right',
        'right-start',
        'right-end',
    ] ),
};

PopperWrapper.defaultProps =
{
    children       : undefined,
    container      : undefined,
    isVisible      : false,
    matchRefWidth  : undefined,
    onClickOutside : undefined,
    popper         : undefined,
    popperOffset   : 'none',
    popperPosition : 'auto',
};

PopperWrapper.displayComponent = componentName;

export default PopperWrapper;

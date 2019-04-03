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

import { IconButton, Text } from '..';

import TimeInput            from './TimeInput';
import { useTheme }         from '../utils';


const componentName = 'DatePickerHeader';

const DatePickerHeader = props =>
{
    const [ cssMap ] = useTheme( componentName, props );

    const {
        hasTimeInput,
        hourIsDisabled,
        hourIsReadOnly,
        hourPlaceholder,
        hourValue,
        isDisabled,
        isReadOnly,
        minuteIsDisabled,
        minuteIsReadOnly,
        minutePlaceholder,
        minuteValue,
        month,
        nextIsDisabled,
        onChangeHour,
        onChangeMinute,
        onClickNext,
        onClickPrev,
        prevIsDisabled,
        year,
    } = props;

    return (
        <div className = { cssMap.main }>
            <div className = { cssMap.buttonsWrapper }>
                <IconButton
                    className  = { cssMap.prev }
                    iconType   = "arrow-left"
                    isDisabled = { isDisabled || prevIsDisabled }
                    onClick    = { onClickPrev }
                    role       = "inverted" />
                <IconButton
                    className  = { cssMap.next }
                    iconType   = "arrow-right"
                    isDisabled = { isDisabled || nextIsDisabled }
                    onClick    = { onClickNext }
                    role       = "inverted" />
            </div>
            <Text className = { cssMap.date }>
                { month }
                <span className = { cssMap.year }> { year } </span>
            </Text>
            { hasTimeInput &&
                <TimeInput
                    hourIsDisabled    = { hourIsDisabled }
                    hourIsReadOnly    = { hourIsReadOnly }
                    hourPlaceholder   = { hourPlaceholder }
                    hourValue         = { hourValue }
                    isDisabled        = { isDisabled }
                    isReadOnly        = { isReadOnly }
                    minuteIsDisabled  = { minuteIsDisabled }
                    minuteIsReadOnly  = { minuteIsReadOnly }
                    minutePlaceholder = { minutePlaceholder }
                    minuteValue       = { minuteValue }
                    onChangeHour      = { onChangeHour }
                    onChangeMinute    = { onChangeMinute } />
            }
        </div>
    );
};

DatePickerHeader.propTypes = {
    className         : PropTypes.string,
    cssMap            : PropTypes.objectOf( PropTypes.string ),
    hasTimeInput      : PropTypes.bool,
    hourIsDisabled    : PropTypes.bool,
    hourIsReadOnly    : PropTypes.bool,
    hourPlaceholder   : PropTypes.string,
    hourValue         : PropTypes.string,
    isDisabled        : PropTypes.bool,
    isReadOnly        : PropTypes.bool,
    minuteIsDisabled  : PropTypes.bool,
    minuteIsReadOnly  : PropTypes.bool,
    minutePlaceholder : PropTypes.string,
    minuteValue       : PropTypes.string,
    month             : PropTypes.string,
    nextIsDisabled    : PropTypes.bool,
    onChangeHour      : PropTypes.func,
    onChangeMinute    : PropTypes.func,
    onClickNext       : PropTypes.func,
    onClickPrev       : PropTypes.func,
    prevIsDisabled    : PropTypes.bool,
    year              : PropTypes.string,
};

DatePickerHeader.defaultProps = {
    className         : undefined,
    cssMap            : undefined,
    hasTimeInput      : true,
    hourIsDisabled    : false,
    hourIsReadOnly    : false,
    hourPlaceholder   : undefined,
    hourValue         : undefined,
    isDisabled        : undefined,
    isReadOnly        : undefined,
    minuteIsDisabled  : false,
    minuteIsReadOnly  : false,
    minutePlaceholder : undefined,
    minuteValue       : undefined,
    month             : undefined,
    nextIsDisabled    : undefined,
    onChangeHour      : undefined,
    onChangeMinute    : undefined,
    onClickNext       : undefined,
    onClickPrev       : undefined,
    prevIsDisabled    : undefined,
    year              : undefined,
};

DatePickerHeader.displayName = componentName;

export default DatePickerHeader;

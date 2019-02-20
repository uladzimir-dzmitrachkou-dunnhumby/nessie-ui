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
import moment               from 'moment';
import _                    from 'lodash';

import DatePickerItem       from '../DatePicker/DatePickerItem';
import DatePickerHeader     from '../DatePicker/DatePickerHeader';
import ThemeContext         from '../Theming/ThemeContext';
import { createCssMap }     from '../Theming';
import { attachEvents }     from '../utils';
import copy                 from '../DateTimeInput/copy.json';


const DAY_LABELS = _.range( 0, 7 ).map( day => ( {
    label : copy.dayHeaders[ day ],
} ) );

/**
 * returns the timestamp of the current moment
 *
 * @return {Number} timestamp
 */
function now()
{
    return new Date().getTime();
}

/**
 * returns utc of the timestamp passed
 *
 * @param {Number} timestamp passed
 *
 * @return {Number} UTC timestamp
 */
function $m( timestamp )
{
    return moment( timestamp ).utc();
}

/**
 * checks if 2 timestamp are equal
 *
 * @param {Number}  ts1 timestamp
 * @param {Number}  ts2 timestamp
 * @param {String}  precision precision to compare
 *
 * @return {Boolean}
 */
function isTimestampEqual( ts1, ts2, precision )
{
    return $m( ts1 ).isSame( $m( ts2 ), precision );
}


export default class DatePickerStateful extends React.Component
{
    static contextType = ThemeContext;

    static propTypes = {
        className : PropTypes.string,
        cssMap    : PropTypes.objectOf( PropTypes.string ),
        headers   : PropTypes.arrayOf( PropTypes
            .objectOf( PropTypes.string ) ),
        hourIsDisabled  : PropTypes.bool,
        hourIsReadOnly  : PropTypes.bool,
        hourPlaceholder : PropTypes.string,
        hourValue       : PropTypes.string,
        isDisabled      : PropTypes.bool,
        isReadOnly      : PropTypes.bool,
        items           : PropTypes.arrayOf( PropTypes
            .arrayOf( PropTypes.object ) ),
        hasTimeInput      : PropTypes.bool,
        label             : PropTypes.string,
        max               : PropTypes.number,
        min               : PropTypes.number,
        minuteIsDisabled  : PropTypes.bool,
        minuteIsReadOnly  : PropTypes.bool,
        minutePlaceholder : PropTypes.string,
        minuteValue       : PropTypes.string,
        month             : PropTypes.string,
        nextIsDisabled    : PropTypes.bool,
        onChangeHour      : PropTypes.func,
        onChangeMinute    : PropTypes.func,
        onClickItem       : PropTypes.func,
        onClickNext       : PropTypes.func,
        onClickPrev       : PropTypes.func,
        prevIsDisabled    : PropTypes.bool,
        type              : PropTypes.oneOf( [ 'day', 'month' ] ),
        value             : PropTypes.number,
        year              : PropTypes.string,
    };

    static defaultProps = {
        className         : undefined,
        cssMap            : undefined,
        hasTimeInput      : true,
        headers           : undefined,
        hourIsDisabled    : false,
        hourIsReadOnly    : false,
        hourPlaceholder   : undefined,
        hourValue         : undefined,
        isDisabled        : false,
        isReadOnly        : false,
        items             : undefined,
        label             : undefined,
        max               : undefined,
        min               : undefined,
        minuteIsDisabled  : false,
        minuteIsReadOnly  : false,
        minutePlaceholder : undefined,
        minuteValue       : undefined,
        month             : undefined,
        nextIsDisabled    : false,
        onChangeHour      : undefined,
        onChangeMinute    : undefined,
        onClickItem       : undefined,
        onClickNext       : undefined,
        onClickPrev       : undefined,
        prevIsDisabled    : false,
        type              : 'day',
        year              : undefined,
        value             : undefined,
    };

    static displayName = 'DatePickerStateful';

    constructor()
    {
        super();

        this.state = {
            timestamp : undefined,
        };
    }

    static getDerivedStateFromProps( props, state )
    {
        let timestamp;

        if ( props.value )
        {
            timestamp = props.value;
        }
        else if ( props.value === null )
        {
            timestamp = undefined;
        }
        else
        {
            timestamp = state.timestamp || now();
        }

        return {
            timestamp,
        };
    }

    isUnitSelectable( timestamp, unit, allowFraction )
    {
        const { max } = this.props;
        const min = this.props.min || now();

        if ( timestamp > max ) return false;

        if ( !allowFraction ) return timestamp >= min;

        return $m( timestamp ).add( 1, unit ) > min;
    }

    dayMatrix()
    {
        const startMonth = $m( timestamp ).startOf( 'month' ).valueOf();

        if ( !startMonth ) return;

        const { timestamp } = this.state;

        const offset = ( $m( startMonth ).weekday() + 6 ) % 7;
        const daysInMonth = $m( startMonth ).daysInMonth();

        const days = _.range( -offset, daysInMonth ).map( dayIndex =>
        {
            const hasDate = dayIndex >= 0 && dayIndex < daysInMonth;
            const label = hasDate ? String( dayIndex + 1 ) : '';
            const value = hasDate ?
                $m( startMonth ).add( dayIndex, 'day' ).valueOf() : null;

            const isDisabled = hasDate && !this.isUnitSelectable(
                value,
                'day',
                this.props.type === 'day',
            );

            const isCurrent = hasDate &&
                isTimestampEqual( value, now(), 'day' );
            const isSelected = hasDate && _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'day' );
            return {
                label,
                value,
                isDisabled,
                isCurrent,
                isSelected,
            };
        } );

        return _.chunk( days, 7 );
    }

    monthMatrix()
    {
        const startYear = $m( timestamp ).startOf( 'year' ).valueOf();

        if ( !startYear ) return;

        const { timestamp } = this.state;

        const months = _.range( 0, 12 ).map( month =>
        {
            const label = copy.shortMonths[ month ];
            const value = $m( startYear ).add( month, 'month' ).valueOf();

            const isDisabled = !this.isUnitSelectable( value, 'month' );

            const isCurrent = isTimestampEqual( value, now(), 'month' );
            const isSelected = _.isNumber( timestamp ) &&
                isTimestampEqual( timestamp, value, 'month' );
            return {
                label,
                value,
                isDisabled,
                isCurrent,
                isSelected,
            };
        } );

        return _.chunk( months, 4 );
    }

    monthLabel()
    {
        const month = $m( this.state.gridStartTimestamp ).month();
        return copy.months[ month ];
    }

    yearLabel()
    {
        return $m( this.state.gridStartTimestamp ).year().toString();
    }

    render()
    {
        const {
            cssMap = createCssMap( this.context.DatePicker, this.props ),
            hasTimeInput,
            headers,
            hourIsDisabled,
            hourIsReadOnly,
            hourPlaceholder,
            hourValue,
            isDisabled,
            isReadOnly,
            items,
            label,
            minuteIsDisabled,
            minuteIsReadOnly,
            minutePlaceholder,
            minuteValue,
            month,
            nextIsDisabled,
            onChangeHour,
            onChangeMinute,
            onClickItem,
            onClickNext,
            onClickPrev,
            prevIsDisabled,
            type,
            year,
        } = this.props;

        const matrix = items || ( type === 'month' ?
            this.monthMatrix() : this.dayMatrix() );

        const datePickerHeaders = headers || ( type !== 'month' && DAY_LABELS );

        return (
            <div { ...attachEvents( this.props ) } className = { cssMap.main }>
                <DatePickerHeader
                    hasTimeInput      = { hasTimeInput }
                    hourIsDisabled    = { hourIsDisabled }
                    hourIsReadOnly    = { hourIsReadOnly }
                    hourPlaceholder   = { hourPlaceholder }
                    hourValue         = { hourValue }
                    isDisabled        = { isDisabled }
                    isReadOnly        = { isReadOnly }
                    label             = { label }
                    minuteIsDisabled  = { minuteIsDisabled }
                    minuteIsReadOnly  = { minuteIsReadOnly }
                    minutePlaceholder = { minutePlaceholder }
                    minuteValue       = { minuteValue }
                    month             = { month || this.monthLabel() }
                    nextIsDisabled    = { nextIsDisabled }
                    onChangeHour      = { onChangeHour }
                    onChangeMinute    = { onChangeMinute }
                    onClickNext       = { onClickNext }
                    onClickPrev       = { onClickPrev }
                    prevIsDisabled    = { prevIsDisabled }
                    year              = { year || this.yearLabel() } />

                { matrix &&
                    <table className = { cssMap.calendar }>
                        { datePickerHeaders &&
                            <thead className = { cssMap.calendarHeader }>
                                <tr>
                                    { datePickerHeaders.map( ( header, i ) =>
                                        <th key = { i }>
                                            <span title = { header.title }>
                                                { header.label }
                                            </span>
                                        </th> ) }
                                </tr>
                            </thead>
                        }
                        <tbody>
                            { matrix.map( ( item, i ) =>
                                <tr key = { i }>
                                    { item.map( ( item, j ) =>
                                        <td key = { j }>
                                            { item.value &&
                                                <DatePickerItem
                                                    { ...item }
                                                    onClick = { onClickItem }
                                                    type    = { type } />
                                            }
                                        </td> ) }
                                </tr> ) }
                        </tbody>
                    </table>
                }
            </div>
        );
    }
}

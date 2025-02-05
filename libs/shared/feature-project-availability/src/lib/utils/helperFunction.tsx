import { ScheduledCallsStatusNames } from '@breef/shared/constants';
import { colors, WithinBudgetIcon } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { Fragment, ReactNode } from 'react';
import moment from 'moment';

export const getNameActionButton = (status: string | null) => {
    if (status === ScheduledCallsStatusNames.MEETING_COMPLETED) {
        return 'Schedule Followup';
    }
    return 'Update Availability';
};

const isOnlyLetters = (inputString: string): boolean =>
    /^[a-zA-Z]+$/.test(inputString);

const getFormattedTimeslotDate = (date: string | null): string | null => {
    if (!date) {
        return null;
    }

    const userTimeZone = moment.tz.guess();
    const momentDate = moment(date);
    const localDate = momentDate.tz(userTimeZone);
    const today = moment().tz(userTimeZone).startOf('day');
    const isToday = localDate.isSame(today, 'day');

    const timeZoneAbbr = localDate.format('z');
    const formattedTimeZone = isOnlyLetters(timeZoneAbbr)
        ? timeZoneAbbr
        : `(${localDate.format('Z')} UTC)`;

    if (isToday) {
        return `Today, ${localDate.format(
            'M/D @ h:mm a',
        )} ${formattedTimeZone}`;
    }

    return `${localDate.format('dddd, M/D @ h:mm a')} ${formattedTimeZone}`;
};

export const getNameStatus = (
    status: string | null,
    date: string | null,
): ReactNode => {
    const formattedDate = getFormattedTimeslotDate(date);

    switch (status) {
        case ScheduledCallsStatusNames.NO_AVAILABILITY_SET:
            return (
                <Fragment>
                    <Indicator className="outline-black" />
                    No Availability Set
                </Fragment>
            );
        case ScheduledCallsStatusNames.AWAITING_TIME_SELECTION:
            return (
                <Fragment>
                    <Indicator className="yellow" />
                    Awaiting Time Selection
                </Fragment>
            );
        case ScheduledCallsStatusNames.MEETING_BOOKING:
            return (
                <Fragment>
                    <Indicator className="outline-green" />
                    Meeting Booked{formattedDate && `: ${formattedDate}`}
                </Fragment>
            );
        case ScheduledCallsStatusNames.MEETING_COMPLETED:
            return (
                <Fragment>
                    <WithinBudgetIcon className="success" />
                    Meeting Completed{formattedDate && `: ${formattedDate}`}
                </Fragment>
            );
        default:
            return null;
    }
};

export const Indicator = styled.span`
    display: inline-block;
    width: 16px;
    min-width: 16px;
    height: 16px;
    border-radius: 50%;

    &.yellow {
        background-color: #f7e646;
        border: 1px solid #f7e646;
    }

    &.outline-black {
        border: 1px solid ${colors.grey.grey900};
    }

    &.outline-green {
        border: 1px solid ${colors.success.success500};
    }
`;

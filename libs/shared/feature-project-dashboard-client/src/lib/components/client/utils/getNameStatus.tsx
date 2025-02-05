import { ScheduledCallsStatusNames } from '@breef/shared/constants';
import { colors, WithinBudgetIcon } from '@breef/ui-kit';
import styled from '@emotion/styled';
import { Fragment, ReactNode } from 'react';

export const getNameStatus = (
    status: string | null,
    date: string | null,
): ReactNode => {
    switch (status) {
        case ScheduledCallsStatusNames.NO_AVAILABILITY_SET:
            return (
                <Fragment>
                    <Indicator className="yellow" />
                    No Availability Set
                </Fragment>
            );
        case ScheduledCallsStatusNames.AWAITING_TIME_SELECTION:
            return (
                <Fragment>
                    <Indicator className="outline-black" />
                    Awaiting Time Selection
                </Fragment>
            );
        case ScheduledCallsStatusNames.MEETING_BOOKING:
            return (
                <Fragment>
                    <Indicator className="outline-green" />
                    Meeting Booked{date && `: ${date}`}
                </Fragment>
            );
        case ScheduledCallsStatusNames.MEETING_COMPLETED:
            return (
                <Fragment>
                    <WithinBudgetIcon className="success" />
                    Meeting Completed{date && `: ${date}`}
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

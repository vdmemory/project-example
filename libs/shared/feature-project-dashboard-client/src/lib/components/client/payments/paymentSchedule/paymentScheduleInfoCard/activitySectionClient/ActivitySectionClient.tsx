import React, { FC } from 'react';
import { StyledActivitySectionAgency } from './ActivitySectionClient.styled';
import { FullPaymentScheduleAgency } from '@breef/shared/types';
import { usePaymentsActivityClientControl } from './usePaymentsActivityClientControl';

interface ActivitySectionProps {
    payments: FullPaymentScheduleAgency[];
}

export const ActivitySectionClient: FC<ActivitySectionProps> = ({
    payments,
}) => {
    const { button, activity } = usePaymentsActivityClientControl({
        payments,
    });

    return (
        <StyledActivitySectionAgency>
            <div className="activity-content-wrapper">
                <span className="accent-label">Activity</span>
                <span className="payments-activity">{activity}</span>
            </div>
            {button}
        </StyledActivitySectionAgency>
    );
};

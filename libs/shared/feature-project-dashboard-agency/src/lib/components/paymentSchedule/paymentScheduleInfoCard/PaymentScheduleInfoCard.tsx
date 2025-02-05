import React from 'react';
import { StyledPaymentScheduleInfoCard } from './PaymentScheduleInfoCard.styled';
import { TotalSection } from './totalSection/TotalSection';
import { ActivitySectionAgency } from './activitySectionAgency/ActivitySectionAgency';
import { FullPaymentScheduleAgency } from '@breef/shared/types';
import { PaymentSchedule } from '@breef/shared/constants';
import { formatBudgetCost } from '@breef/shared/utils';
import { ActivitySectionClient } from './activitySectionClient/ActivitySectionClient';

type Props = {
    linkDownloadContract: string;
    payments: FullPaymentScheduleAgency[];
    userType: 'client' | 'agency';
};

const PaymentScheduleInfoCard: React.FC<Props> = ({
    linkDownloadContract,
    payments,
    userType,
}) => {
    const notCancelledPayments = payments.filter(
        item => item.status !== PaymentSchedule.cancelled,
    );
    const paidPayments = payments.filter(
        item => item.status === PaymentSchedule.paid,
    );

    const totalPaidValue = formatBudgetCost(
        paidPayments.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );
    const totalTeamTakeValue =
        userType === 'agency'
            ? formatBudgetCost(
                  paidPayments.reduce(
                      (acc, curr) => acc + Number(curr.teamTake || 0),
                      0,
                  ),
              )
            : undefined;
    const totalValue = formatBudgetCost(
        notCancelledPayments.reduce(
            (acc, curr) => acc + Number(curr.amount),
            0,
        ),
    );

    return (
        <StyledPaymentScheduleInfoCard>
            <TotalSection
                totalPaid={totalPaidValue}
                totalValue={totalValue}
                totalTeamTake={totalTeamTakeValue}
            />
            {userType === 'client' ? (
                <ActivitySectionClient payments={payments} />
            ) : (
                <ActivitySectionAgency
                    payments={payments}
                    linkDownloadContract={linkDownloadContract}
                />
            )}
        </StyledPaymentScheduleInfoCard>
    );
};
export default PaymentScheduleInfoCard;

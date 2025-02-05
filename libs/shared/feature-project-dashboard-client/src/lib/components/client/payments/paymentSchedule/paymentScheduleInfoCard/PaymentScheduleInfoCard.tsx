import React from 'react';
import { StyledPaymentScheduleInfoCard } from './PaymentScheduleInfoCard.styled';
import { TotalSection } from './totalSection/TotalSection';
import { FullPaymentScheduleAgency } from '@breef/shared/types';
import { PaymentSchedule } from '@breef/shared/constants';
import { formatBudgetCost } from '@breef/shared/utils';
import { ActivitySectionClient } from './activitySectionClient/ActivitySectionClient';

type Props = {
    linkDownloadContract: string;
    payments: FullPaymentScheduleAgency[];
    userType: 'client' | 'agency';
};

const PaymentScheduleInfoCard: React.FC<Props> = ({ payments }) => {
    const notCancelledPayments = payments.filter(
        item => item.status !== PaymentSchedule.cancelled,
    );
    const paidPayments = payments.filter(
        item => item.status === PaymentSchedule.paid,
    );

    const totalPaidValue = formatBudgetCost(
        paidPayments.reduce((acc, curr) => acc + Number(curr.amount), 0),
    );

    const totalValue = formatBudgetCost(
        notCancelledPayments.reduce(
            (acc, curr) => acc + Number(curr.amount),
            0,
        ),
    );

    return (
        <StyledPaymentScheduleInfoCard>
            <TotalSection totalPaid={totalPaidValue} totalValue={totalValue} />
            <ActivitySectionClient payments={payments} />
        </StyledPaymentScheduleInfoCard>
    );
};
export default PaymentScheduleInfoCard;

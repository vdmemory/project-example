import React, { FC } from 'react';
import { StyledActivitySectionAgency } from './ActivitySectionAgency.styled';
import { PaymentsActivity } from './paymentsActivity/PaymentsActivity';
import { DownloadInvoiceIconMin } from '@breef/shared/assets';
import { FullPaymentScheduleAgency } from '@breef/shared/types';
import moment from 'moment/moment';
import { useNearestAwaitingPaymentsInSameDay } from '../../../../hooks/useNearestAwaitingPaymentsInSameDay';
import { TermsAndContracts } from '../../termsAndContracts/TermsAndContracts';

interface ActivitySectionProps {
    payments: FullPaymentScheduleAgency[];
    linkDownloadContract: string;
}

export const ActivitySectionAgency: FC<ActivitySectionProps> = ({
    linkDownloadContract,
    payments,
}) => {
    const { nearestAwaitingPayment, nearestAwaitingPaymentsInSameDayCodes } =
        useNearestAwaitingPaymentsInSameDay(payments);

    const nearestPaymentTerms = React.useMemo(
        () =>
            moment(nearestAwaitingPayment?.paymentDue).diff(
                nearestAwaitingPayment?.invoiceDate,
                'days',
            ),
        [
            nearestAwaitingPayment?.invoiceDate,
            nearestAwaitingPayment?.paymentDue,
        ],
    );

    return (
        <StyledActivitySectionAgency>
            <span className="accent-label">Activity</span>
            <PaymentsActivity
                paymentCodes={nearestAwaitingPaymentsInSameDayCodes}
                date={moment(nearestAwaitingPayment?.invoiceDate).format(
                    'MMM Do, YYYY',
                )}
            />
            <div className="footer-activity-section">
                <TermsAndContracts
                    paymentTerms={
                        nearestAwaitingPaymentsInSameDayCodes.length
                            ? nearestPaymentTerms
                            : undefined
                    }
                    linkDownloadContract={linkDownloadContract}
                />
            </div>
        </StyledActivitySectionAgency>
    );
};

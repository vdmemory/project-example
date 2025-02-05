import React from 'react';
import PaymentScheduleHeader from '../../../paymentSchedule/paymentScheduleHeader/PaymentScheduleHeader';
import {
    KickoffRequestType,
    PaymentActionType,
    PaymentsTable,
} from '@breef/shared/types';
import { ReviewRetainerBlock } from '@breef/shared/ui-components';

type Props = {
    handleAddOrEditPayments: () => void;
    link: string;
    isAction: boolean;
    kickoffStatus: KickoffRequestType['status'];
    paymentOngoing: PaymentsTable | null;
    normalizedPaymentTerms: string;
    paymentFrequency: string;
    actionType?: PaymentActionType;
};
const PaymentsOngoing: React.FC<Props> = ({
    handleAddOrEditPayments,
    link,
    kickoffStatus,
    paymentOngoing,
    normalizedPaymentTerms,
    paymentFrequency,
    actionType,
    isAction,
}) => {
    return (
        <>
            <div className="schedule-header">
                <PaymentScheduleHeader
                    role="agency"
                    title="Retainer payment Schedule"
                    handleAddOrEditPayments={handleAddOrEditPayments}
                    linkDownloadContract={link}
                    isKickoffView
                    isAction={isAction}
                    actionType={actionType}
                />
            </div>
            {paymentOngoing && (
                <ReviewRetainerBlock
                    {...paymentOngoing}
                    paymentTerms={normalizedPaymentTerms}
                    paymentFrequency={paymentFrequency}
                    userType={'agency'}
                />
            )}
        </>
    );
};
export default PaymentsOngoing;

import React, { FC } from 'react';
import { StyledPaymentsActivity } from './PaymentsActivity.styled';
import { useConcatPaymentCodes } from '../../../../../hooks/useConcatPaymentCodes';

interface PaymentsActivityProps {
    paymentCodes: string[];
    date: string;
}

export const PaymentsActivity: FC<PaymentsActivityProps> = ({
    paymentCodes,
    date,
}) => {
    const concatPaymentCodes = useConcatPaymentCodes();
    const renderFutureInvoiceCodes = (codes: string[]) => (
        <span>
            Payment{codes.length > 1 ? 's' : ''} {concatPaymentCodes(codes)}{' '}
            will be invoiced on {date}
        </span>
    );

    const renderContent = () => {
        if (paymentCodes.length) {
            return renderFutureInvoiceCodes(paymentCodes);
        }
        return <span>No Activity</span>;
    };

    return <StyledPaymentsActivity>{renderContent()}</StyledPaymentsActivity>;
};

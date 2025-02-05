import {
    PaymentScheduleTag,
    PaymentScheduleTagRequest,
} from '@breef/shared/constants';
import { ColoredTag, Tooltip } from '@breef/shared/ui-components';
import { WarningTipIcon } from '@breef/shared/assets';
import styled from '@emotion/styled';

const renderWarningTip = (tipText: string) => (
    <Tooltip
        placement="top"
        className="tooltip"
        label={tipText}
        strategy="fixed"
    >
        <WarningTipIcon />
    </Tooltip>
);

export const usePaymentTag = () => {
    const getPaymentTagComponent = (
        tag: PaymentScheduleTag,
        warningTip?: string,
    ) => {
        switch (tag) {
            case PaymentScheduleTag[PaymentScheduleTagRequest.awaiting]:
                return <ColoredTag tag="Awaiting" color="purple" />;
            case PaymentScheduleTag[PaymentScheduleTagRequest.invoiceSent]:
                return <ColoredTag tag="Invoice Sent" color="orange" />;
            case PaymentScheduleTag[PaymentScheduleTagRequest.paymentDue]:
                return (
                    <StyledTagWrapper>
                        <ColoredTag tag="Payment Due" color="orange" />
                        {warningTip && renderWarningTip(warningTip)}
                    </StyledTagWrapper>
                );
            case PaymentScheduleTag[PaymentScheduleTagRequest.processing]:
                return <ColoredTag tag="Processing" color="blue" />;
            case PaymentScheduleTag[PaymentScheduleTagRequest.paid]:
                return <ColoredTag tag="Paid" color="green" />;
            case PaymentScheduleTag[PaymentScheduleTagRequest.cancelled]:
                return <ColoredTag tag="Cancelled" />;
            default:
                return <ColoredTag tag="Unknown Tag" />;
        }
    };

    return { getPaymentTagComponent };
};

const StyledTagWrapper = styled.span`
    display: flex;
    align-items: center;
    gap: 10px;

    .tooltip {
        display: flex;
    }
`;

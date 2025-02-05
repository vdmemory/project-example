import { StyledPaymentsSection } from './PaymentsSection.styled';
import React, { ReactNode } from 'react';

interface PaymentsSectionProps {
    children: ReactNode;
    paddingBottomSize?: number;
}

export const PaymentsSection: React.FC<PaymentsSectionProps> = ({
    children,
    paddingBottomSize = 80,
}) => {
    return (
        <StyledPaymentsSection paddingBottomSize={paddingBottomSize}>
            <div className="content-wrapper">{children}</div>
        </StyledPaymentsSection>
    );
};
export default PaymentsSection;

import React from 'react';
import {
    StyledFlexRow,
    StyledReviewRetainerBlock,
} from './ReviewRetainerBlock.styled';
import { CardView } from '../../../select/cardSelect/cardController/cardView/CardView';

interface TablePaymentScheduleProps {
    payBy: string;
    deliverable: string;
    amount: string;
    teamTake: string;
    paymentFrequency: string;
    paymentTerms: string;
    userType: 'client' | 'agency';
}

export const ReviewRetainerBlock: React.FC<TablePaymentScheduleProps> = ({
    payBy,
    deliverable,
    amount,
    teamTake,
    paymentFrequency,
    paymentTerms,
    userType,
}) => {
    return (
        <StyledReviewRetainerBlock className="retainer-block">
            <StyledFlexRow>
                <CardView label="Deliverable" description={deliverable} />
                <CardView
                    label="Payment frequency"
                    description={paymentFrequency}
                />
            </StyledFlexRow>
            <StyledFlexRow>
                <CardView label="Amount" description={amount} />
                {userType === 'agency' && (
                    <CardView
                        label="Team take"
                        description={teamTake}
                        tooltip="What your team earns (amount - Breef's fee, which will vary depending on payment type)"
                    />
                )}
            </StyledFlexRow>
            <StyledFlexRow>
                <CardView label="Payment terms" description={paymentTerms} />
                <CardView label="First payment due" description={payBy} />
            </StyledFlexRow>
        </StyledReviewRetainerBlock>
    );
};
export default ReviewRetainerBlock;

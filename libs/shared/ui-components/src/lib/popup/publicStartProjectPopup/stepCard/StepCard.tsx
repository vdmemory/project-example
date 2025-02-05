import React, { FC } from 'react';
import { StyledStepCard } from './StepCard.styled';

interface StepCardProps {
    stepNumber: number;
    label: string;
    text: string;
}
export const StepCard: FC<StepCardProps> = ({ stepNumber, text, label }) => {
    return (
        <StyledStepCard>
            <span className="step-number">Step {stepNumber}</span>
            <span className="label">{label}</span>
            <p>{text}</p>
        </StyledStepCard>
    );
};

export default StepCard;

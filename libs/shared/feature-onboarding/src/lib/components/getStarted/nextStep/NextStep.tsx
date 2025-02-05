import { StyledNextStep } from './NextStep.styled';
import { ReactNode } from 'react';
import { AccentNumber } from '@breef/shared/ui-components';

interface NextStepProps {
    numberStep: number;
    icon: ReactNode;
    label: string;
}

export function NextStep({ numberStep, icon, label }: NextStepProps) {
    return (
        <StyledNextStep>
            <AccentNumber number={numberStep} />
            <div className="icon-wrapper">{icon}</div>
            <span className="label-next-step">{label}</span>
        </StyledNextStep>
    );
}

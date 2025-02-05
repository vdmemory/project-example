import { FC, ReactNode } from 'react';
import { StyledStepSection } from './StepSection.styled';

interface StepSectionProps {
    children: ReactNode;
}
export const StepSection: FC<StepSectionProps> = ({ children }) => {
    return (
        <StyledStepSection>
            <div className="section-wrapper">{children}</div>
        </StyledStepSection>
    );
};

export default StepSection;

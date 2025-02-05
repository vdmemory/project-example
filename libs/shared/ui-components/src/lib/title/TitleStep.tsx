import { StyledTitleStep } from './TitleStep.styled';
import { ReactNode } from 'react';

interface TitleStepProps {
    step?: number;
    numberSteps?: number;
    title: string;
    className?: string;
    noteIcon?: ReactNode;
    subTitle?: string;
}

export const TitleStep = ({
    step,
    numberSteps,
    title,
    className,
    noteIcon,
    subTitle,
}: TitleStepProps) => {
    return (
        <StyledTitleStep className={className}>
            {!!step && !!numberSteps && (
                <div className="step-number">
                    {step}/{numberSteps}
                </div>
            )}
            <div className="step-title-wrapper">
                <h2 className="step-title">
                    {title}
                    <span className="note-icon">{noteIcon}</span>
                </h2>
                {subTitle && <h4 className="step-subtitle">{subTitle}</h4>}
            </div>
        </StyledTitleStep>
    );
};

export default TitleStep;

import { FC } from 'react';
import {
    StyledCreationNavigationSection,
    StyledProgressItem,
} from './CreationNavigationSection.styled';
import { ArrowLeft32x32, ArrowRightIcon, Button } from '@breef/ui-kit';
import { ProjectCreationStepsEnum, ProjectStep } from '@breef/shared/constants';

interface CreationNavigationSectionProps {
    onNext?: () => void;
    onBack: () => void;
    isDisabledNext?: boolean;
    isSubmittingNext?: boolean;
    isPenMode?: boolean;
    step: number;
    stepsCount: number;
    children?: React.ReactNode;
}
export const CreationNavigationSection: FC<CreationNavigationSectionProps> = ({
    onNext,
    onBack,
    isDisabledNext,
    isSubmittingNext,
    isPenMode,
    step,
    stepsCount,
    children,
}) => {
    const renderProgress = () => (
        <div className="progress-wrapper">
            {Array.from({ length: stepsCount }, (_, i) => i + 1).map(item => (
                <StyledProgressItem key={item} isActive={step >= item} />
            ))}
        </div>
    );

    const getNextButtonTitle = () => {
        if (step === stepsCount) {
            return 'Post project';
        }
        if (isPenMode) {
            return 'Finalize + Review';
        }
        if (step === ProjectStep.COMPANY_DETAILS) {
            return 'Review';
        }
        return 'Next';
    };

    return (
        <StyledCreationNavigationSection
            className="navigation-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            {renderProgress()}
            <div className="nav-buttons-wrapper">
                <button
                    className="button-back"
                    data-testid="button-container"
                    onClick={onBack}
                    disabled={isSubmittingNext}
                >
                    <ArrowLeft32x32 />
                </button>
                <div className="right-section">
                    {children}
                    {!!onNext && (
                        <Button
                            label={getNextButtonTitle()}
                            size="large"
                            isUppercase
                            isDisabled={isDisabledNext}
                            isSubmitted={isSubmittingNext}
                            onClick={onNext}
                            className="button-next"
                        />
                    )}
                </div>
            </div>
        </StyledCreationNavigationSection>
    );
};

export default CreationNavigationSection;

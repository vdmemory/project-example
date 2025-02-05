import { FC } from 'react';
import {
    StyledNavigationSection,
    StyledProgressItem,
} from './NavigationSection.styled';
import { ArrowLeft32x32, ArrowRightIcon, Button } from '@breef/ui-kit';
import { usePitchCreateSelector } from '../../../store/hooks';
import { AnimationOpacity } from '@breef/shared/ui-components';
import { PitchStep } from '@breef/shared/constants';

interface NavigationSectionProps {
    onNext?: () => void;
    onBack: () => void;
    isDisabledNext?: boolean;
    step: number;
    stepsCount: number;
    children?: React.ReactNode;
}
export const NavigationSection: FC<NavigationSectionProps> = ({
    onNext,
    onBack,
    isDisabledNext,
    step,
    stepsCount,
    children,
}) => {
    const { isSubmittingNext, isPenMode } = usePitchCreateSelector(
        state => state,
    ).pitchCreate;

    const renderProgress = () => (
        <div className="progress-wrapper">
            {Array.from({ length: stepsCount }, (_, i) => i + 1).map(item => (
                <StyledProgressItem key={item} isActive={step >= item} />
            ))}
        </div>
    );

    const getButtonTitle = () => {
        if (isPenMode) {
            return 'Finalize + Review';
        }
        if (step === stepsCount) {
            return 'Submit';
        }

        return 'Next';
    };

    return (
        <StyledNavigationSection className="navigation-section">
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
                {children && <div className="children">{children}</div>}
                {!!onNext && (
                    <Button
                        label={getButtonTitle()}
                        size="large"
                        isUppercase
                        isDisabled={isDisabledNext}
                        isSubmitted={isSubmittingNext}
                        onClick={onNext}
                        className="button-next"
                    />
                )}
            </div>
        </StyledNavigationSection>
    );
};

export default NavigationSection;

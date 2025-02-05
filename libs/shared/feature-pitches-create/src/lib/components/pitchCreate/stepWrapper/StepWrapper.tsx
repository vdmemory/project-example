import { FC, ReactNode, useEffect } from 'react';
import { StyledStepWrapper } from './StepWrapper.styled';
import StepSection from './stepSection/StepSection';
import { AnimationOpacity } from '@breef/shared/ui-components';
import {
    usePitchCreateActions,
    usePitchCreateSelector,
} from '../../../store/hooks';
import { useTargetElement } from '@breef/shared/hooks';
import { ANIMATION_DURATION } from '../../../utils/constants';

interface StepWrapperProps {
    children: ReactNode;
    label: string;
}

export const StepWrapper: FC<StepWrapperProps> = ({ children, label }) => {
    const { targetElementId } = usePitchCreateSelector(
        state => state,
    ).pitchCreate;
    const { resetPenMode } = usePitchCreateActions();
    useTargetElement({ targetElementId });

    useEffect(() => {
        return () => {
            resetPenMode();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <StyledStepWrapper>
            <StepSection>
                <AnimationOpacity
                    className="content-wrapper"
                    duration={ANIMATION_DURATION}
                >
                    <h2>{label}</h2>
                    <div className="divider" />
                    {children}
                </AnimationOpacity>
            </StepSection>
        </StyledStepWrapper>
    );
};

export default StepWrapper;

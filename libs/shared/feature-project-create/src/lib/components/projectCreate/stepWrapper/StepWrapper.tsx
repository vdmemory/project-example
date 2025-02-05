import { FC, ReactNode, useEffect } from 'react';
import { StyledStepWrapper } from './StepWrapper.styled';
import {
    useProjectCreateActions,
    useProjectCreateSelector,
} from '../../../store/hooks';
import { useMediaContext, useTargetElement } from '@breef/shared/hooks';

interface StepWrapperProps {
    children: ReactNode;
    label: string;
    description?: string;
    isLoading?: boolean;
}

export const StepWrapper: FC<StepWrapperProps> = ({
    children,
    label,
    description,
    isLoading,
}) => {
    const { isMobile } = useMediaContext();
    const { targetElementId } = useProjectCreateSelector(
        state => state,
    ).projectCreate;
    const { resetPenMode } = useProjectCreateActions();
    const scrollOffset = !isMobile ? 200 : 130;
    useTargetElement({ targetElementId, scrollOffset });

    useEffect(() => {
        return () => {
            resetPenMode();
        };
    }, []);

    return (
        <StyledStepWrapper isLoading={isLoading}>
            <h2>{label}</h2>
            <p className="description">{description}</p>
            <div className="divider" />
            <div className="step-body">{children}</div>
        </StyledStepWrapper>
    );
};

export default StepWrapper;

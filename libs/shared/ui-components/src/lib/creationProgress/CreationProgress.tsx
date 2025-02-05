import React, { FC } from 'react';
import {
    StyledCreationProgress,
    StyledProgressBar,
} from './CreationProgress.styled';

interface CreationProgressProps {
    config: string[];
    step: number;
}
export const CreationProgress: FC<CreationProgressProps> = ({
    config,
    step,
}) => {
    return (
        <StyledCreationProgress>
            <StyledProgressBar active={step} items={config} isVertical />
        </StyledCreationProgress>
    );
};

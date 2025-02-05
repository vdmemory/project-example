/* eslint-disable no-lone-blocks */
import { ProgressBar } from '../ProgressBar';
import { StyledMultiProgressBar } from './MultiProgressBar.styled';

export interface MultiProgressBarProps {
    step: number;
    stepper: number;
    numberSteppersSteps: number[];
    isHideLabels?: boolean;
    isHideProgressBar?: boolean;
    isScrollableBarOnMobile?: boolean;
    config: { name: string; fillSize: string }[];
}

export function MultiProgressBar({
    step,
    stepper,
    numberSteppersSteps,
    isHideLabels = false,
    isHideProgressBar = false,
    isScrollableBarOnMobile = false,
    config,
}: MultiProgressBarProps) {
    if (isHideProgressBar) return null;

    return (
        <StyledMultiProgressBar
            data-testid="multi-progress-bar"
            className="progress-bar"
            isScrollableBarOnMobile={isScrollableBarOnMobile}
        >
            {config.map((item, key) => (
                <ProgressBar
                    key={key}
                    config={item}
                    isCurrentProgressBar={stepper === key + 1}
                    isCompletedProgress={stepper > key + 1}
                    step={step}
                    numberSteps={numberSteppersSteps[key]}
                    isHideLabel={isHideLabels}
                />
            ))}
        </StyledMultiProgressBar>
    );
}

import { StyledProgressBar } from './ProgressBar.styled';
import { ProgressBarText } from './progressBarText/ProgressBarText';

export interface ProgressBarProps {
    step: number;
    numberSteps: number;
    config?: { name: string; fillSize: string };
    isCurrentProgressBar?: boolean;
    isCompletedProgress?: boolean;
    isHideLabel?: boolean;
}

export function ProgressBar({
    step,
    numberSteps,
    config,
    isCurrentProgressBar = true,
    isCompletedProgress = false,
    isHideLabel = false,
}: ProgressBarProps) {
    const getClipPath = (step: number, numberSteps: number): string => {
        const valueNow = (step / numberSteps) * 100;
        if (isCurrentProgressBar) return `inset(0% ${100 - valueNow}% 0% 0%)`;
        if (isCompletedProgress) return 'inset(0% 0% 0% 0%)';
        return 'inset(0% 100% 0% 0%)';
    };

    if (config) {
        return (
            <ProgressBarText
                config={config}
                progressClipPath={getClipPath(step, numberSteps)}
                isHideLabel={isHideLabel}
            />
        );
    }

    return (
        <StyledProgressBar
            data-testid="progress-bar"
            className="progress-bar"
            step={step}
            numberSteps={numberSteps}
        >
            <div className="progress"></div>
        </StyledProgressBar>
    );
}

export default ProgressBar;

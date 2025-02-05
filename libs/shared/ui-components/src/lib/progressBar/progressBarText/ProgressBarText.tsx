import { StyledProgressBarText } from './ProgressBarText.styled';

interface ProgressBarTextProps {
    config: { name: string; fillSize: string };
    progressClipPath: string;
    isHideLabel?: boolean;
}

export const ProgressBarText = ({
    config,
    progressClipPath,
    isHideLabel = false,
}: ProgressBarTextProps) => {
    return (
        <StyledProgressBarText
            data-testid="progress-bar-text"
            fillSize={config.fillSize}
            isHideLabel={isHideLabel}
        >
            <div
                className="progress-text progress-text-back"
                role="progressbar"
            >
                <p className="group-name">{config.name}</p>
            </div>
            <div
                className="progress-clipper"
                aria-hidden="true"
                style={{
                    clipPath: progressClipPath,
                }}
            >
                <div className="progress-text progress-text-front">
                    <p className="group-name">{config.name}</p>
                </div>
            </div>
        </StyledProgressBarText>
    );
};

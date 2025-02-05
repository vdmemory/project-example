import { StyledNextSteps } from './NextSteps.styled';

interface NextStepsProps {
    imageUrl: string;
    title: string;
    note: string;
    numeric: number;
}

export function NextSteps({ imageUrl, title, note, numeric }: NextStepsProps) {
    return (
        <StyledNextSteps>
            <div className="image-wrapper">
                <img className={`image-${numeric}`} src={imageUrl} alt="" />
            </div>
            <span className="title">{title}</span>
            <span className="note">{note}</span>
        </StyledNextSteps>
    );
}

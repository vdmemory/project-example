import { CloseIcon, WarningIcon } from '../../../icons/svg';
import { StyledTagInput } from './TagInput.styled';

interface TagInputProps {
    id: number;
    value: string;
    onClick: (id: number) => void;
    isWarning?: boolean;
}

export const TagInput = ({ id, value, onClick, isWarning }: TagInputProps) => {
    return (
        <StyledTagInput key={id} className="chip">
            {isWarning && <WarningIcon className="warning-icon" />}
            <span>{value}</span>
            <button
                onClick={() => onClick(id)}
                type="button"
                className="remove-btn"
            >
                <CloseIcon className="close-icon" />
            </button>
        </StyledTagInput>
    );
};

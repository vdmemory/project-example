import { StyledInputFieldPreview } from './InputFieldPreview.styled';
import { EditIcon } from '@breef/ui-kit';
import { PencilThingIcon } from '@breef/shared/assets';

interface InputFieldPreviewProps {
    value: string;
    onClick: () => void;
}

export const InputFieldPreview = ({
    value,
    onClick,
}: InputFieldPreviewProps) => {
    return (
        <StyledInputFieldPreview>
            <span>{value}</span>
            <PencilThingIcon onClick={onClick} data-testid="edit-icon" />
        </StyledInputFieldPreview>
    );
};

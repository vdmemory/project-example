import { CloseIcon, PlusIcon } from '@breef/shared/assets';
import { StyledChipButton } from './ChipButton.styled';

interface ChipButtonProps {
    id: number;
    name: string;
    action: 'remove' | 'add';
    icon?: boolean;
    disabled?: boolean;
    onClick: (
        event: React.SyntheticEvent,
        type: 'remove' | 'add',
        id: number,
    ) => void;
}

export const ChipButton = ({
    id,
    name,
    action,
    icon = true,
    onClick,
    disabled = false,
}: ChipButtonProps) => {
    const handleClick = (event: React.SyntheticEvent) => {
        onClick(event, action, id);
    };
    return (
        <StyledChipButton
            isDisabled={disabled}
            action={action}
            icon={icon}
            onClick={!disabled ? handleClick : undefined}
            data-testid="chip-button"
        >
            {name}
            {icon && action === 'remove' && (
                <CloseIcon className="close-icon" />
            )}
            {icon && action === 'add' && <PlusIcon className="plus-icon" />}
        </StyledChipButton>
    );
};

export default ChipButton;

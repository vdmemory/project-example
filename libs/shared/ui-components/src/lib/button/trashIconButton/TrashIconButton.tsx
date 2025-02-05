import React, { FC, SyntheticEvent } from 'react';
import { StyledTrashIconButton } from './TrashIconButton.styled';
import { TrashIcon } from '@breef/ui-kit';

interface TrashIconButtonProps {
    onClick: (e: SyntheticEvent) => void;
    className?: string;
    disabled?: boolean;
}
export const TrashIconButton: FC<TrashIconButtonProps> = props => (
    <StyledTrashIconButton
        data-testid="trash-icon-button"
        className="trash-btn"
        type="button"
        {...props}
    >
        <TrashIcon />
    </StyledTrashIconButton>
);

export default TrashIconButton;

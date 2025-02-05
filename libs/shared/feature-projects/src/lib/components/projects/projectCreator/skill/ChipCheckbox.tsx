import React, { FC } from 'react';
import { StyledChipCheckbox } from './ChipCheckbox.styled';
import { CheckMarkSmallIcon } from '@breef/ui-kit';

interface ChipCheckboxProps {
    name: string;
    checked: boolean;
    onChange: () => void;
    disabled?: boolean;
}
export const ChipCheckbox: FC<ChipCheckboxProps> = ({
    name,
    checked,
    onChange,
    disabled,
}) => {
    return (
        <StyledChipCheckbox isChecked={checked} isDisabled={!!disabled}>
            {checked && <CheckMarkSmallIcon data-testid="check-icon" />}
            <span>{name}</span>
            <input
                type="checkbox"
                checked={checked}
                onChange={onChange}
                disabled={disabled}
            />
        </StyledChipCheckbox>
    );
};

export default ChipCheckbox;

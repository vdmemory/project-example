import { ChangeEvent } from 'react';
import { StyledCheckbox } from './Checkbox.styled';
import { CheckMarkBoldWhite } from '@breef/shared/assets';

interface CheckboxProps {
    checked: boolean;
    onChange?: (e: ChangeEvent) => void;
    className?: string;
}
export const Checkbox = ({ checked, onChange, className }: CheckboxProps) => {
    const handleChange = (e: ChangeEvent) => onChange?.(e);

    return (
        <StyledCheckbox className={className}>
            <CheckMarkBoldWhite />
            <input
                data-testid="input-checkbox"
                onChange={handleChange}
                checked={checked}
                type="checkbox"
            />
        </StyledCheckbox>
    );
};

export default Checkbox;

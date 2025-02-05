import React, { ChangeEvent } from 'react';
import { StyledFieldCheckBox } from './FieldCheckBox.styled';
import { CheckMark, CheckMinIcon } from '@breef/shared/assets';

export interface FieldSelectProps {
    value: boolean;
    onChange: (value: boolean) => void;
    label?: string;
    className?: string;
    icon?: 'mark' | 'standard';
    children?: React.ReactNode;
    isDisabled?: boolean;
}

export const FieldCheckBox = ({
    value,
    onChange,
    label = '',
    className,
    icon = 'mark',
    children,
    isDisabled = false,
}: FieldSelectProps) => {
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        onChange(event.target.checked);
    };

    return (
        <StyledFieldCheckBox
            isChecked={value}
            isDisabled={isDisabled}
            className={className}
        >
            <span className="checkbox">
                <input
                    data-testid="checkbox-input"
                    type="checkbox"
                    value={value + ''}
                    onChange={handleChange}
                    checked={value}
                />
                {icon === 'mark' ? (
                    <CheckMark className="checkmark" />
                ) : (
                    <CheckMinIcon className="checkstandard" />
                )}
            </span>
            {children ?? label}
        </StyledFieldCheckBox>
    );
};

export default FieldCheckBox;

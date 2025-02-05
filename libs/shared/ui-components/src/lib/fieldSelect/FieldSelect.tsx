import React from 'react';
import {
    StyledFieldSelect,
    StyledFieldSelectLabel,
} from './FieldSelect.styled';
import { FieldError } from '../fieldError/FieldError';
import { NextNavArrow } from '@breef/shared/assets';

export interface FieldSelectProps {
    value?: string;
    onClick: (key: string, data: React.SyntheticEvent) => void;
    onMouseEnter?: (e: React.SyntheticEvent, id: number) => void;
    onMouseLeave?: (id?: number) => void;
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    typeButton?: 'submit' | 'button';
    disabled?: boolean;
    error?: string;
    list: { value: string; label: string }[];
}

export const FieldSelect = ({
    value,
    onChange,
    onClick,
    typeButton = 'button',
    disabled = false,
    error,
    list,
    onMouseEnter,
    onMouseLeave,
}: FieldSelectProps) => {
    return (
        <StyledFieldSelect data-testid="field-select">
            {list.map((item, key) => (
                <StyledFieldSelectLabel
                    data-testid={`select-test-${key}`}
                    key={`select-key-${key}`}
                    isSelected={item.value === value}
                    onMouseEnter={e =>
                        onMouseEnter ? onMouseEnter(e, key) : null
                    }
                    onMouseLeave={() => onMouseLeave && onMouseLeave()}
                >
                    <NextNavArrow className="arrow-img" />
                    {item.label}
                    <input
                        id={`field-select-${key}-form`}
                        type="radio"
                        name={'select'}
                        disabled={disabled}
                        onChange={value => {
                            onChange(value);
                            onClick('nav-event', value);
                        }}
                        value={item.value}
                    />
                </StyledFieldSelectLabel>
            ))}
            {error && <FieldError error={error} />}
        </StyledFieldSelect>
    );
};

export default FieldSelect;

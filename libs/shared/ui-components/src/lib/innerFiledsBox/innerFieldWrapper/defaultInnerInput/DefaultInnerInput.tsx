import React, { ChangeEvent } from 'react';
import { StyledDefaultInnerInput } from './DefaultInnerInput.styled';

interface DefaultInputProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder?: string;
    maxLength?: number;
    isDisabled?: boolean;
}

export const DefaultInnerInput = ({
    value,
    onChange,
    placeholder,
    maxLength = 255,
    isDisabled = false,
}: DefaultInputProps) => {
    return (
        <StyledDefaultInnerInput
            data-testid="input"
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            maxLength={maxLength}
            disabled={isDisabled}
        />
    );
};

export default DefaultInnerInput;

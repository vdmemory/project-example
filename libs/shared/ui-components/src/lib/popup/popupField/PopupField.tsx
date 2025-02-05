import React, { ReactNode } from 'react';
import { StyledPopupField } from './PopupField.styled';

interface FieldInputProps {
    label: string;
    labelView?: 'uppercase' | 'default';
    value?: string;
    onChange?: (value: React.ChangeEvent<HTMLInputElement>) => void;
    type?: string;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    minLength?: number;
    maxLength?: number;
    children?: ReactNode;
}

export const PopupField = ({
    label,
    labelView = 'default',
    value = '',
    onChange,
    type = 'text',
    placeholder,
    disabled = false,
    minLength,
    maxLength,
    error,
    children,
}: FieldInputProps) => {
    return (
        <StyledPopupField
            htmlFor={children ? 'disable-label-click' : undefined}
        >
            <span
                className={`label-name ${
                    labelView === 'uppercase' && 'label-uppercase'
                }`}
            >
                {label}
            </span>
            {!children ? (
                <input
                    type={type}
                    placeholder={placeholder}
                    disabled={disabled}
                    onChange={onChange && (value => onChange(value))}
                    value={value}
                    autoComplete="off"
                    minLength={minLength || 0}
                    maxLength={maxLength || 255}
                />
            ) : (
                children
            )}
        </StyledPopupField>
    );
};

export default PopupField;

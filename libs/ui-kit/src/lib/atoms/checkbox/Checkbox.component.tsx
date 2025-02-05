import React, { useMemo } from 'react';
import {
    StyledChildren,
    StyledIndeterminate,
    StyledLabel,
} from './Checkbox.styled';
import { CheckboxSelection } from '../../icons';
interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'default' | 'error';
    label?: string;
    indeterminate?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
    onChange,
    variant = 'default',
    label,
    indeterminate = false,
    children,
    ...rest
}) => {
    const checkboxClasses = useMemo(() => {
        if (rest.checked && !indeterminate) {
            return 'checkbox checkbox-selected';
        } else if (!rest.checked && indeterminate) {
            return 'checkbox  checkbox-indeterminate';
        } else {
            return 'checkbox';
        }
    }, [rest, indeterminate]);

    const handleLabelKeyDown = (
        event: React.KeyboardEvent<HTMLLabelElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!rest.disabled) {
                onChange({
                    target: {
                        value: `${rest.value}`,
                        checked: rest.checked,
                    },
                } as React.ChangeEvent<HTMLInputElement>);
            }
        }
    };

    return (
        <>
            <StyledLabel
                variant={variant}
                disabled={rest.disabled || false}
                tabIndex={0}
                onKeyDown={handleLabelKeyDown}
            >
                <span className={checkboxClasses}>
                    <input
                        type="checkbox"
                        onChange={onChange}
                        checked={rest.checked}
                        {...rest}
                    />
                    {!indeterminate && <CheckboxSelection />}

                    {indeterminate && (
                        <StyledIndeterminate
                            variant={variant}
                            className="indeterminate"
                        />
                    )}
                </span>
                {label && <span className="checkbox-label">{label}</span>}{' '}
            </StyledLabel>
            {children && (
                <StyledChildren className="checkbox-children">
                    {children}
                </StyledChildren>
            )}
        </>
    );
};

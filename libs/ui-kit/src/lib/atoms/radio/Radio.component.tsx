import React from 'react';
import { StyledLabel } from './Radio.styled';
import { RadioSelection } from '../../icons';

interface RadioProps extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    variant?: 'default' | 'error';
    label?: string;
    classNameLabel?: string;
    small?: boolean;
}

export const Radio: React.FC<RadioProps> = ({
    onChange,
    variant = 'default',
    label,
    classNameLabel,
    small,
    ...rest
}) => {
    const handleLabelKeyDown = (
        event: React.KeyboardEvent<HTMLLabelElement>,
    ) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (rest.value && !rest.disabled) {
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
        <StyledLabel
            small={small}
            variant={variant}
            disabled={rest.disabled || false}
            tabIndex={0}
            onKeyDown={handleLabelKeyDown}
            className={`radio-label ${classNameLabel ?? ''}`}
        >
            <span className={rest.checked ? 'radio radio-selected' : 'radio'}>
                <input
                    type="radio"
                    onChange={onChange}
                    checked={rest.checked}
                    id={label || `${rest.value}`}
                    {...rest}
                />
                <RadioSelection />
            </span>
            {label && <span className="radio-label">{label}</span>}{' '}
        </StyledLabel>
    );
};

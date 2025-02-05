import React, { FC } from 'react';
import { StyledRadioRectangle } from './RadioRectangle.styled';
import { CheckboxChecked16x16, RadioSelectionOutline } from '../../icons';

interface RadioRectangleProps
    extends React.InputHTMLAttributes<HTMLInputElement> {
    onChange: (value: React.ChangeEvent<HTMLInputElement>) => void;
    label?: string;
    selectAreaView?: 'radio' | 'checkbox';
    isError?: boolean;
    className?: string;
}

export const RadioRectangle: FC<RadioRectangleProps> = ({
    label,
    onChange,
    selectAreaView = 'radio',
    isError,
    className,
    ...rest
}) => {
    const renderCheckMark = () => {
        if (selectAreaView === 'checkbox') {
            return <CheckboxChecked16x16 className="checkbox-icon" />;
        }
        return <RadioSelectionOutline className="radio-icon" />;
    };

    return (
        <StyledRadioRectangle
            disabled={rest.disabled || false}
            checked={rest.checked}
            selectAreaView={selectAreaView}
            isError={isError}
            className={className}
            data-testid="radio-rectangle"
        >
            <span className="radio">
                <input id={label} type="radio" onChange={onChange} {...rest} />
                {renderCheckMark()}
            </span>
            {label && <span className="radio-label">{label}</span>}
        </StyledRadioRectangle>
    );
};
